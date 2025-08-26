'use client';

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

type StepType = 'warmup' | 'exercise' | 'rest' | 'final';

interface ExerciseStep {
  id: string;
  name: string;
  type: 'reps' | 'time' | 'rest_seconds';
  reps?: number | null;
  seconds?: number | null;
  media_url?: string | null;
  description?: string | null;
}

export default function SessionRunPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [includeWarmup, setIncludeWarmup] = useState(false);
  const [steps, setSteps] = useState<ExerciseStep[]>([]);
  const [index, setIndex] = useState(0);
  const [restCountdown, setRestCountdown] = useState<number>(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: session, error } = await supabase
        .from("sessions")
        .select("include_warmup")
        .eq("id", id)
        .single();
      if (error) { setError(error.message); setLoading(false); return; }
      setIncludeWarmup(!!session?.include_warmup);

      // TODO: load real steps via session_circuits -> circuit_exercises -> exercises
      // for now dummy steps to validate flow
      setSteps([
        { id: "1", name: "Pompes", type: "reps", reps: 12, seconds: null, media_url: null, description: "Pompes classiques" },
        { id: "2", name: "Repos", type: "rest_seconds", seconds: 30 },
        { id: "3", name: "Gainage", type: "time", seconds: 45, description: "Planche" }
      ]);
      setLoading(false);
    }
    load();
  }, [id]);

  const current = steps[index] as ExerciseStep | undefined;
  const isWarmup = includeWarmup && index === 0;
  const effectiveIndex = includeWarmup ? index - 1 : index;
  const progress = useMemo(() => {
    const total = steps.length + (includeWarmup ? 1 : 0);
    const cur = Math.min(index + 1, total);
    return Math.round((cur / total) * 100);
  }, [index, steps.length, includeWarmup]);

  useEffect(() => {
    let timer: any;
    if (current?.type === "time" && (current.seconds ?? 0) > 0) {
      let left = current.seconds ?? 0;
      timer = setInterval(() => {
        left -= 1;
        if (left <= 0) {
          clearInterval(timer);
          handleNext();
        }
      }, 1000);
    } else if (current?.type === "rest_seconds" && (current.seconds ?? 0) > 0) {
      let left = current.seconds ?? 0;
      setRestCountdown(left);
      timer = setInterval(() => {
        left -= 1;
        setRestCountdown(left);
        if (left <= 0) {
          clearInterval(timer);
          handleNext();
        }
      }, 1000);
    }
    return () => timer && clearInterval(timer);
  }, [index, current?.type, current?.seconds]);

  function handleNext() {
    const total = steps.length + (includeWarmup ? 1 : 0);
    const next = index + 1;
    if (next >= total) {
      setIndex(next);
    } else {
      setIndex(next);
    }
  }

  function handlePrev() {
    setIndex(Math.max(0, index - 1));
  }

  async function validateSession() {
    await supabase.from("sessions").update({ realised: true }).eq("id", id);
    router.push("/seances");
  }

  if (loading) return <div className="card">Chargement...</div>;
  if (error) return <div className="card">Erreur: {error}</div>;

  const total = steps.length + (includeWarmup ? 1 : 0);
  if (index >= total) {
    return (
      <div className="grid gap-4 max-w-xl mx-auto">
        <div className="card text-center">
          <h1 className="text-2xl font-semibold mb-2">Bravo, séance terminée 🎉</h1>
          <p className="opacity-80">Tu peux valider la séance ou recommencer.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={validateSession} className="btn">Valider la séance</button>
          <button onClick={() => setIndex(0)} className="btn">Recommencer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 max-w-xl mx-auto">
      <div className="card">
        <div className="h-2 rounded bg-white/10 overflow-hidden mb-3">
          <div className="h-full bg-white/80" style={{ width: `${progress}%` }} />
        </div>

        {includeWarmup && index === 0 ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Échauffement</h2>
            <p className="opacity-80 mb-3">Lance ta musique préférée pour t&apos;échauffer.</p>
            {process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL && (
              <iframe
                title="Warmup"
                src={process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            )}
          </div>
        ) : (
          current && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{current.name}</h2>
              <div className="text-sm opacity-80 mb-2">Type: {current.type}</div>
              {current.description && <p className="opacity-90 mb-3">{current.description}</p>}
              {current.type === "reps" && <p className="text-lg">Répétitions: <strong>{current.reps ?? 0}</strong></p>}
              {current.type === "time" && <p className="text-lg">Durée: <strong>{current.seconds ?? 0}s</strong></p>}
              {current.type === "rest_seconds" && <p className="text-lg">Repos: <strong>{restCountdown}s</strong></p>}
            </div>
          )
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={handlePrev} className="btn">Retour</button>
        <button onClick={handleNext} className="btn">Suivant</button>
      </div>
    </div>
  );
}

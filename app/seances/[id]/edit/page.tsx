'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function EditSessionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [date, setDate] = useState<string>("");
  const [warmup, setWarmup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("sessions")
        .select("scheduled_date, include_warmup")
        .eq("id", id)
        .single();
      setLoading(false);
      if (error) { setError(error.message); return; }
      setDate(data?.scheduled_date ?? "");
      setWarmup(!!data?.include_warmup);
    }
    load();
  }, [id]);

  async function save() {
    setError(null);
    const { error } = await supabase
      .from("sessions")
      .update({ scheduled_date: date, include_warmup: warmup })
      .eq("id", id);
    if (error) { setError(error.message); return; }
    router.push("/seances");
  }

  if (loading) return <div className="card">Chargement...</div>;
  return (
    <div className="grid gap-4 max-w-lg">
      <h1 className="text-2xl font-semibold">Éditer la séance</h1>
      <div className="card grid gap-3">
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <input id="warmup" type="checkbox" checked={warmup} onChange={(e) => setWarmup(e.target.checked)} />
          <label htmlFor="warmup">Inclure un échauffement</label>
        </div>
        {error && <div className="text-red-300 text-sm">{error}</div>}
        <button onClick={save} className="btn">Enregistrer</button>
      </div>
    </div>
  );
}

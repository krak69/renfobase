'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateSessionPage() {
  const [date, setDate] = useState<string>("");
  const [warmup, setWarmup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function createSession() {
    setLoading(true); setError(null);
    if (!date) { setError("La date est obligatoire"); setLoading(false); return; }
    const { data, error } = await supabase.from("sessions").insert({
      scheduled_date: date,
      include_warmup: warmup,
      realised: false
    }).select("id").single();
    setLoading(false);
    if (error) { setError(error.message); return; }
    if (data?.id) router.push(`/seances/${data.id}`);
  }

  return (
    <div className="grid gap-4 max-w-lg">
      <h1 className="text-2xl font-semibold">Créer une séance</h1>
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
        <button onClick={createSession} disabled={loading} className="btn">
          {loading ? "Création..." : "Créer"}
        </button>
      </div>
    </div>
  );
}

import { getSupabaseServer } from "@/lib/supabaseServer";
import type { Session } from "@/lib/types";
import Link from "next/link";

export default async function SeancesPage() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("sessions")
    .select("id, scheduled_date, include_warmup, realised, created_at")
    .order("scheduled_date", { ascending: true });
  if (error) {
    return <div className="card">Erreur: {error.message}</div>;
  }
  const sessions = (data ?? []) as Session[];
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Séances</h1>
        <Link className="btn" href="/seances/creer">Créer une séance</Link>
      </div>
      <div className="grid gap-3">
        {sessions.map((s) => (
          <article key={s.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{new Date(s.scheduled_date).toLocaleDateString('fr-FR')}</div>
              <div className="text-xs opacity-80">
                Échauffement: {s.include_warmup ? "oui" : "non"} — Réalisée: {s.realised ? "oui" : "non"}
              </div>
            </div>
            <div className="flex gap-2">
              <Link className="btn" href={`/seances/${s.id}`}>Ouvrir</Link>
              <Link className="btn" href={`/seances/${s.id}/edit`}>Éditer</Link>
            </div>
          </article>
        ))}
        {sessions.length === 0 && <div className="card opacity-80">Aucune séance</div>}
      </div>
    </div>
  );
}

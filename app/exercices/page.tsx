export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getSupabaseServer } from "@/lib/supabaseServer";
import type { Exercise } from "@/lib/types";
import Link from "next/link";

type SearchParams = { q?: string; page?: string; pageSize?: string };

export default async function ExercicesPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = getSupabaseServer();
  const pageSize = Math.max(1, Math.min(50, Number(searchParams?.pageSize) || 10));
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const q = (searchParams?.q ?? "").trim();

  let query = supabase
    .from("exercises")
    .select("id,name,description,media_url,type,created_at", { count: "exact" });

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  query = query.order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);

  const { data, error, count } = await query;
  if (error) {
    return <div className="card">Erreur: {error.message}</div>;
  }

  const exercises = (data ?? []) as Exercise[];
  const total = count ?? exercises.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));

  const mkUrl = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (pageSize !== 10) params.set("pageSize", String(pageSize));
    params.set("page", String(p));
    return `/exercices?${params.toString()}`;
  };

  return (
    <div className="grid gap-4">
      <form className="flex items-end gap-2 card">
        <div className="flex-1">
          <label htmlFor="q">Recherche</label>
          <input defaultValue={q} id="q" name="q" placeholder="Nom de l'exercice" className="w-full" />
        </div>
        <div>
          <label htmlFor="pageSize">Par page</label>
          <select id="pageSize" name="pageSize" defaultValue={String(pageSize)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <button type="submit" className="btn">Filtrer</button>
      </form>

      <div className="grid gap-3">
        {exercises.map((ex) => (
          <article key={ex.id} className="card">
            <div className="flex gap-3 items-start">
              {ex.media_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ex.media_url} alt={ex.name} className="w-24 h-24 object-cover rounded-lg" />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-white/5 grid place-items-center text-xs opacity-70">No media</div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{ex.name}</h3>
                <div className="text-xs opacity-70 mb-1">Type: <span className="uppercase">{ex.type}</span></div>
                {ex.description && <p className="opacity-85 text-sm">{ex.description}</p>}
              </div>
            </div>
          </article>
        ))}
        {exercises.length === 0 && <div className="card opacity-80">Aucun exercice</div>}
      </div>

      <div className="flex items-center justify-between card">
        <div className="text-sm opacity-80">
          Page {page} / {maxPage} — {total} résultat(s)
        </div>
        <div className="flex gap-2">
          <Link className="btn" href={mkUrl(1)}>« Première</Link>
          <Link className="btn" href={mkUrl(Math.max(1, page - 1))}>‹ Précédente</Link>
          <Link className="btn" href={mkUrl(Math.min(maxPage, page + 1))}>Suivante ›</Link>
          <Link className="btn" href={mkUrl(maxPage)}>Dernière »</Link>
        </div>
      </div>
    </div>
  );
}

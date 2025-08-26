export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card">
        <h1 className="text-2xl font-semibold mb-2">Bienvenue dans RenfoBase</h1>
        <p className="opacity-80">
          Base technique prête pour Next.js + Tailwind + Supabase. Ajoute tes exercices,
          crée des circuits et lance des séances.
        </p>
      </section>
      <section className="card">
        <h2 className="text-xl font-semibold mb-2">Étapes suivantes</h2>
        <ol className="list-decimal ms-5 space-y-1 opacity-90">
          <li>Configure les variables d&apos;environnement sur Vercel</li>
          <li>Crée le schéma SQL sur Supabase</li>
          <li>Commence à saisir des exercices</li>
        </ol>
      </section>
    </div>
  );
}

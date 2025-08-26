import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-10">
      {/* HERO */}
      <section className="card relative overflow-hidden p-8 md:p-12">
        <div className="absolute inset-0 -z-10 opacity-40">
          {/* léger décor, sans dépendance */}
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <defs>
              <radialGradient id="g" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="600" fill="url(#g)" />
          </svg>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            RenfoBase — planifie, exécute et suis tes séances de renforcement
          </h1>
          <p className="opacity-90 text-base md:text-lg mb-6">
            Conçois tes <strong>exercices</strong>, groupe-les en <strong>circuits</strong>, programme tes{" "}
            <strong>séances</strong> et déroule-les pas à pas (timers automatiques, repos, validation).
            Simple, rapide, efficace.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm opacity-90 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5">
              ✅ Bibliothèque d’exercices
            </span>
            <span className="text-sm opacity-90 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5">
              ✅ Circuits réutilisables
            </span>
            <span className="text-sm opacity-90 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5">
              ✅ Séances programmées & suivi
            </span>
            <span className="text-sm opacity-90 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 bg-white/5">
              ✅ Timers & validation de fin
            </span>
          </div>

        <div className="flex flex-wrap gap-3">
            <Link href="/exercices" className="btn text-base">
              Voir les exercices
            </Link>
            <Link href="/seances" className="btn text-base">
              Voir les séances
            </Link>
          </div>
        </div>
      </section>

      {/* FONCTIONNEMENT RAPIDE */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">1) Crée tes exercices</h2>
          <p className="opacity-85">
            Ajoute le nom, la description, un visuel (optionnel) et choisis le{" "}
            <em>type</em> : <strong>reps</strong>, <strong>time</strong> ou <strong>rest_seconds</strong>.
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">2) Compose des circuits</h2>
          <p className="opacity-85">
            Assemble plusieurs exercices, règle l’ordre et les paramètres (répétitions, secondes). 
            Les circuits sont réutilisables dans toutes tes séances.
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">3) Programme & déroule</h2>
          <p className="opacity-85">
            Planifie une séance par date, lance le déroulé (échauffement, exos, repos), puis
            <strong> valide</strong> la séance quand elle est terminée.
          </p>
        </div>
      </section>

      {/* ACCÈS RAPIDES */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Accéder aux exercices</h3>
          <p className="opacity-85 mb-4">
            Parcours ta bibliothèque, recherche par nom, pagine par 10/20/50. 
            Ajoute progressivement tes mouvements.
          </p>
          <Link href="/exercices" className="btn">Aller aux exercices</Link>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Accéder aux séances</h3>
          <p className="opacity-85 mb-4">
            Consulte les séances à venir, édite la date ou l’échauffement, duplique une séance type
            et lance le déroulé.
          </p>
          <Link href="/seances" className="btn">Aller aux séances</Link>
        </div>
      </section>
    </div>
  );
}

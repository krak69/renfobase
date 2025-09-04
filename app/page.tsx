import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid gap-10">
      {/* HERO plein écran */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="relative h-[360px] md:h-[520px]">
          {/* Background image full width */}
          <Image
            src="/images/renfobase-hero.webp"
            alt="Athlète en tenue de renforcement — RenfoBase"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay pour lisibilité */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Contenu hero (centré) */}
          <div className="relative container h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                RenfoBase — planifie, exécute et suis tes séances de renforcement
              </h1>
              <p className="opacity-95 text-base md:text-lg mb-6">
                Conçois tes <strong>programmes</strong>de <strong>renforcement musculaire</strong>,
                programme tes <strong>séances</strong> et déroule-les pas à pas
                (timers automatiques, repos, validation). Simple, rapide, efficace.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/exercices" className="btn text-base bg-white/10 hover:bg-white/20">
                  Voir les exercices
                </Link>
                <Link href="/seances" className="btn text-base bg-white/10 hover:bg-white/20">
                  Voir les séances
                </Link>
              </div>
            </div>
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
          <h2 className="text-xl font-semibold mb-2">2) Compose tes séances</h2>
          <p className="opacity-85">
            Assemble plusieurs exercices, règle l’ordre et les paramètres (répétitions, secondes).
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

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="text-xl font-semibold">RenfoBase</Link>
        <div className="flex gap-3 text-sm">
          <Link href="/exercices" className="btn">Exercices</Link>
          <Link href="/circuits" className="btn">Circuits</Link>
          <Link href="/seances" className="btn">Séances</Link>
        </div>
      </div>
    </nav>
  );
}

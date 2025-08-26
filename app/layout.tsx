import "./globals.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RenfoBase",
  description: "App d'entraînement renfo — Next.js + Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

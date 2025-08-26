# RenfoBase — Starter Next.js + Supabase (Vercel friendly)

Ce dépôt te permet de relancer RenfoBase **sans dev local** : crée un repo GitHub,
colle ces fichiers, connecte Vercel & Supabase, et c'est parti.

## 1) Pré-requis
- Compte GitHub, Vercel, Supabase
- Un projet Supabase (gratuit ok)

## 2) Étapes rapides
1. Crée un repo GitHub `renfobase` (public ou privé).
2. Dépose ces fichiers (tels quels) dans le repo.
3. Sur Vercel → **New Project** → importe ton repo.
4. Ajoute les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (optionnel) `NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL`
5. Déploie → Vercel détecte Next.js.
6. Dans Supabase → SQL Editor → exécute le schéma ci-dessous.

## 3) Schéma SQL (copie/colle dans Supabase)

```sql
-- Exercises
create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  media_url text,
  type text not null check (type in ('reps','time','rest_seconds')),
  created_at timestamptz not null default now()
);

-- Circuits
create table if not exists public.circuits (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- Circuit items
create table if not exists public.circuit_exercises (
  id uuid primary key default gen_random_uuid(),
  circuit_id uuid not null references public.circuits(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  position int not null default 0,
  reps int,
  seconds int,
  created_at timestamptz not null default now()
);

-- Sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  scheduled_date date not null,
  include_warmup boolean not null default false,
  realised boolean not null default false,
  created_at timestamptz not null default now()
);

-- Session circuits
create table if not exists public.session_circuits (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  circuit_id uuid not null references public.circuits(id) on delete cascade,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.exercises enable row level security;
alter table public.circuits enable row level security;
alter table public.circuit_exercises enable row level security;
alter table public.sessions enable row level security;
alter table public.session_circuits enable row level security;

create policy "read_exercises" on public.exercises for select using (true);
create policy "read_circuits" on public.circuits for select using (true);
create policy "read_circuit_exercises" on public.circuit_exercises for select using (true);

create policy "write_all_auth" on public.exercises
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "write_all_auth_circuits" on public.circuits
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "write_all_auth_circuit_exercises" on public.circuit_exercises
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "write_all_auth_sessions" on public.sessions
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "write_all_auth_session_circuits" on public.session_circuits
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Optionnel: seed de 3 exercices
insert into public.exercises (name, description, type) values
('Pompes', 'Pompes classiques', 'reps'),
('Planche', 'Gainage coude', 'time'),
('Repos', 'Entre séries', 'rest_seconds');
```

## 4) Pages incluses
- `/` accueil
- `/exercices` listing avec recherche + pagination (server component, pas de hook client)
- `/seances` listing
- `/seances/creer` création (client component + supabase-js)
- `/seances/[id]` déroulé minimal (échauffement + timers + validation)
- `/seances/[id]/edit` édition date + warmup
- `/circuits` placeholder (builder à venir)

## 5) Dépannage
- **Erreur "Supabase env vars are missing"** → ajoute les vars sur Vercel (Project Settings → Environment Variables) + redeploy.
- **Erreur de build Next.js** → vérifie `package.json` contient bien `next` en dependencies.
- **CORS / RLS** → assure-toi que tu es connecté côté Supabase si tu changes les policies.

## 6) Roadmap conseillée
- Builder Circuits (drag & drop)
- Session → charger les vrais steps via `session_circuits -> circuit_exercises -> exercises`
- Auth Supabase (email magic link) + ownership de contenu
- Thumbnails et upload (Storage Supabase)
- Améliorations UI (shadcn/ui, toasts, modales)


---

## Note de compatibilité ESLint (Vercel)
Si vous avez une erreur `ERESOLVE` liée à `eslint`, restez sur **eslint 8.57.0** avec **eslint-config-next 14.2.5** (inclus ici).  
Vercel utilisera **Node 20** (via `engines` et `.nvmrc`).

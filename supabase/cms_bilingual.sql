alter table public.blog_posts
  add column if not exists translation_group_id uuid;

create unique index if not exists blog_posts_translation_group_language_uidx
  on public.blog_posts (translation_group_id, language)
  where translation_group_id is not null;

create index if not exists blog_posts_translation_group_idx
  on public.blog_posts (translation_group_id);

-- 2. Stockage centralisé des contenus configurables du site.
create table if not exists public.site_settings (
  id text primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, settings)
values ('global', '{}'::jsonb)
on conflict (id) do nothing;

-- 3. Sécurité RLS.
alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "site_settings_authenticated_insert" on public.site_settings;
create policy "site_settings_authenticated_insert"
on public.site_settings
for insert
to authenticated
with check (id = 'global');

drop policy if exists "site_settings_authenticated_update" on public.site_settings;
create policy "site_settings_authenticated_update"
on public.site_settings
for update
to authenticated
using (id = 'global')
with check (id = 'global');

-- ============================================================
-- 4. Publication programmée fiable
-- ============================================================
-- Les anciennes lignes restent compatibles : un status NULL est
-- considéré comme publié par le frontend et le serveur.
alter table public.blog_posts
  add column if not exists status text default 'published',
  add column if not exists scheduled_at timestamptz,
  add column if not exists published_at timestamptz;

create index if not exists blog_posts_publication_idx
  on public.blog_posts (language, status, scheduled_at, created_at desc);

-- ============================================================
-- 5. Likes anonymes par visiteur/navigateur
-- ============================================================
create table if not exists public.blog_likes (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  constraint blog_likes_visitor_id_length check (char_length(visitor_id) between 16 and 128),
  constraint blog_likes_unique_visitor_post unique (post_id, visitor_id)
);

create index if not exists blog_likes_post_idx
  on public.blog_likes (post_id);

alter table public.blog_likes enable row level security;

drop policy if exists "blog_likes_public_read" on public.blog_likes;
create policy "blog_likes_public_read"
on public.blog_likes
for select
to anon, authenticated
using (true);

drop policy if exists "blog_likes_public_insert" on public.blog_likes;
create policy "blog_likes_public_insert"
on public.blog_likes
for insert
to anon, authenticated
with check (
  char_length(post_id) > 0
  and char_length(visitor_id) between 16 and 128
);

drop policy if exists "blog_likes_public_delete" on public.blog_likes;
create policy "blog_likes_public_delete"
on public.blog_likes
for delete
to anon, authenticated
using (true);

-- ============================================================
-- 6. Commentaires publics
-- ============================================================
create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  author_name text not null,
  content text not null,
  is_approved boolean not null default true,
  created_at timestamptz not null default now(),
  constraint blog_comments_author_name_length check (char_length(trim(author_name)) between 1 and 80),
  constraint blog_comments_content_length check (char_length(trim(content)) between 1 and 2000)
);

create index if not exists blog_comments_post_idx
  on public.blog_comments (post_id, created_at desc);

alter table public.blog_comments enable row level security;

drop policy if exists "blog_comments_public_read" on public.blog_comments;
create policy "blog_comments_public_read"
on public.blog_comments
for select
to anon, authenticated
using (is_approved = true);

drop policy if exists "blog_comments_public_insert" on public.blog_comments;
create policy "blog_comments_public_insert"
on public.blog_comments
for insert
to anon, authenticated
with check (
  is_approved = true
  and char_length(trim(author_name)) between 1 and 80
  and char_length(trim(content)) between 1 and 2000
);

-- La suppression/modération reste réservée aux comptes authentifiés.
drop policy if exists "blog_comments_authenticated_update" on public.blog_comments;
create policy "blog_comments_authenticated_update"
on public.blog_comments
for update
to authenticated
using (true)
with check (true);

drop policy if exists "blog_comments_authenticated_delete" on public.blog_comments;
create policy "blog_comments_authenticated_delete"
on public.blog_comments
for delete
to authenticated
using (true);

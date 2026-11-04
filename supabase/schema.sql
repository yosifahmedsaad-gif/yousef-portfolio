create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  category_en text not null,
  category_ar text not null,
  description_en text not null,
  description_ar text not null,
  url text,
  image_url text,
  frame_folder text,
  frame_urls text[] not null default '{}',
  total_frames integer not null default 0 check (total_frames >= 0),
  start_frame integer not null default 1 check (start_frame > 0),
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_frame_count_matches
    check (
      (frame_folder is not null and total_frames > 0)
      or cardinality(frame_urls) = total_frames
      or total_frames = 0
    ),
  constraint projects_start_frame_in_range
    check (start_frame <= greatest(total_frames, 1))
);

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (public.is_portfolio_admin());

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_portfolio_admin());

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

insert into public.projects (
  id, name_en, name_ar, category_en, category_ar,
  description_en, description_ar, url, frame_folder, total_frames,
  start_frame, featured, sort_order
) values
  (
    '00000000-0000-4000-8000-000000000001',
    'Wessyka', 'ويزي كا', 'Brand experience', 'تجربة علامة تجارية',
    'A warm, expressive digital home for a brand with a story worth slowing down for.',
    'واجهة رقمية دافئة ومعبرة لعلامة تجارية تستحق قصتها أن تُروى بهدوء.',
    'https://wessy-ka-nubian-guest-house-cultural-lounge.ai.studio/',
    'frameswessyka', 40, 1, true, 1
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Kato Wadi', 'كاتو وادي', 'E-commerce', 'تجارة إلكترونية',
    'A playful storefront built to make discovering and choosing feel effortless.',
    'متجر مرح يجعل استكشاف المنتجات واختيارها تجربة سهلة وممتعة.',
    'https://rfhywsfahmdsd-jpg.github.io/Kato-Waidi-Nubian-Lodge/',
    'frameskato', 40, 12, false, 2
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'Sala Real Estate', 'سالا العقارية', 'Real estate', 'عقارات',
    'A refined property experience where considered typography meets intuitive search.',
    'تجربة عقارية أنيقة تجمع بين الخطوط المدروسة والبحث السهل.',
    'https://yosifahmedsaad-gif.github.io/sala-real-estate-portal/',
    'framessala', 40, 10, false, 3
  ),
  (
    '00000000-0000-4000-8000-000000000004',
    'Koshary El Safwa', 'كشري الصفوة', 'Food & hospitality', 'مطاعم وضيافة',
    'A bold, welcoming identity and online experience for an Egyptian classic.',
    'هوية جريئة وتجربة رقمية مرحبة لطبق مصري أصيل.',
    'https://yosifahmedsaad-gif.github.io/koshary-alsafwa-live/',
    'frameskoshary', 40, 1, true, 4
  ),
  (
    '00000000-0000-4000-8000-000000000005',
    'Wood-Fire Essence', 'وود فاير إيسنس', 'E-commerce', 'تجارة إلكترونية',
    'An online storefront for Wood-Fire Essence.',
    'متجر إلكتروني لعلامة وود فاير إيسنس.',
    'https://2780459.playcode.site/',
    'frameswoodfire', 40, 1, false, 5
  )
on conflict (id) do update set
  name_en = excluded.name_en,
  name_ar = excluded.name_ar,
  category_en = excluded.category_en,
  category_ar = excluded.category_ar,
  description_en = excluded.description_en,
  description_ar = excluded.description_ar,
  url = excluded.url,
  frame_folder = excluded.frame_folder,
  total_frames = excluded.total_frames,
  start_frame = excluded.start_frame,
  featured = excluded.featured,
  sort_order = excluded.sort_order;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-frames',
  'project-frames',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read project frames" on storage.objects;
create policy "Public can read project frames"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-frames');

drop policy if exists "Admins can upload project frames" on storage.objects;
create policy "Admins can upload project frames"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'project-frames'
    and public.is_portfolio_admin()
  );

drop policy if exists "Admins can update project frames" on storage.objects;
create policy "Admins can update project frames"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'project-frames'
    and public.is_portfolio_admin()
  )
  with check (
    bucket_id = 'project-frames'
    and public.is_portfolio_admin()
  );

drop policy if exists "Admins can delete project frames" on storage.objects;
create policy "Admins can delete project frames"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'project-frames'
    and public.is_portfolio_admin()
  );

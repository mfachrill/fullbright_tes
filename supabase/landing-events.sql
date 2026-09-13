create table if not exists public.landing_events (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now(),
    zone text not null,
    action text not null,
    label text not null,
    page_url text not null
);

alter table public.landing_events enable row level security;

create policy "Anyone can record a landing-page event"
on public.landing_events
for insert
to anon
with check (true);

create policy "Authenticated users can view landing-page events"
on public.landing_events
for select
to authenticated
using (true);

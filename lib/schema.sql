-- ============================================
-- MARVELOUSLY POLISHED - Supabase SQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- ============================================
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  email text unique not null,
  role text default 'customer' check (role in ('admin', 'customer')),
  email_verified boolean default false,
  verification_token text,
  created_at timestamp with time zone default now()
);

-- ============================================
-- 2. APPOINTMENTS TABLE
-- ============================================
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text not null,
  service text not null check (service in ('Plain Set', 'Basic Set', 'Full Set')),
  date text not null,
  time text not null,
  requests text,
  design text,
  status text default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- 3. SERVICES TABLE
-- ============================================
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price_short numeric not null,
  price_medium numeric not null,
  price_long numeric not null,
  created_at timestamp with time zone default now()
);

-- Insert default services
insert into services (name, description, price_short, price_medium, price_long) values
  ('Plain Set', 'Simple & Elegant', 400, 450, 500),
  ('Basic Set', 'Most Popular Choice', 450, 500, 550),
  ('Full Set', 'Premium Experience', 600, 650, 700);

-- ============================================
-- 4. GALLERY TABLE
-- ============================================
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  title text,
  category text default 'general',
  created_at timestamp with time zone default now()
);

-- ============================================
-- 5. REVIEWS TABLE
-- ============================================
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamp with time zone default now()
);

-- Insert sample reviews
insert into reviews (name, rating, comment) values
  ('Maria S.', 5, 'Amazing service! The nail artists are so talented and professional.'),
  ('Jessica L.', 5, 'Best nail salon in Santa Ana! Clean, relaxing atmosphere.'),
  ('Sarah M.', 5, 'I am obsessed with my nails! The attention to detail is incredible.');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table users enable row level security;
alter table appointments enable row level security;
alter table services enable row level security;
alter table gallery enable row level security;
alter table reviews enable row level security;

-- Users: anyone can read, only owner can update
create policy "Users are viewable by everyone" on users for select using (true);
create policy "Users can update own record" on users for update using (auth.uid() = id);

-- Appointments: anyone can insert, anyone can read (admin handles via API)
create policy "Anyone can insert appointments" on appointments for insert with check (true);
create policy "Anyone can read appointments" on appointments for select using (true);
create policy "Anyone can update appointments" on appointments for update using (true);

-- Services: public read
create policy "Services are viewable by everyone" on services for select using (true);

-- Gallery: public read
create policy "Gallery is viewable by everyone" on gallery for select using (true);

-- ============================================
-- 6. PAYMENTS TABLE
-- ============================================
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  appointment_id uuid references appointments(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  service text not null,
  amount numeric not null,
  payment_type text not null check (payment_type in ('half', 'full')),
  reference_number text,
  screenshot_url text,
  status text default 'Pending' check (status in ('Pending', 'Verified', 'Rejected')),
  created_at timestamp with time zone default now()
);

-- Payments: anyone can insert, anyone can read
create policy "Anyone can insert payments" on payments for insert with check (true);
create policy "Anyone can read payments" on payments for select using (true);
create policy "Anyone can update payments" on payments for update using (true);
alter table payments enable row level security;

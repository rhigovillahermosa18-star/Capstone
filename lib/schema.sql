-- ============================================
-- MARVELOUSLY POLISHED - Supabase SQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- ============================================
create table if not exists users (
  id uuid default gen_random_uuid() primary key,
  username text not null,
  email text unique not null,
  phone text,
  password text not null,
  role text default 'customer' check (role in ('admin', 'customer')),
  email_verified boolean default false,
  verification_code text,
  verification_code_expires timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- ============================================
-- 2. APPOINTMENTS TABLE
-- ============================================
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  service text not null check (service in ('Plain Set', 'Basic Set', 'Full Set')),
  date text not null,
  time text not null,
  requests text,
  design text,
  design_image text,
  status text default 'Pending' check (status in ('Pending', 'Confirmed', 'Cancelled', 'Done')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- 3. PAYMENTS TABLE
-- ============================================
create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  appointment_id uuid references appointments(id) on delete set null,
  user_id uuid references users(id) on delete set null,
  service text not null,
  amount numeric not null,
  payment_type text not null check (payment_type in ('half', 'full')),
  screenshot_url text,
  customer_name text,
  status text default 'Pending' check (status in ('Pending', 'Verified', 'Rejected')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete set null,
  name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- 5. GALLERY TABLE
-- ============================================
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  title text default '',
  category text default 'General',
  created_at timestamp with time zone default now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table users enable row level security;
alter table appointments enable row level security;
alter table payments enable row level security;
alter table reviews enable row level security;
alter table gallery enable row level security;

-- Users
create policy "Users are viewable by everyone" on users for select using (true);
create policy "Users can be inserted by anyone" on users for insert with check (true);
create policy "Users can update own record" on users for update using (true);

-- Appointments
create policy "Anyone can insert appointments" on appointments for insert with check (true);
create policy "Anyone can read appointments" on appointments for select using (true);
create policy "Anyone can update appointments" on appointments for update using (true);

-- Payments
create policy "Anyone can insert payments" on payments for insert with check (true);
create policy "Anyone can read payments" on payments for select using (true);
create policy "Anyone can update payments" on payments for update using (true);

-- Reviews
create policy "Anyone can insert reviews" on reviews for insert with check (true);
create policy "Anyone can read reviews" on reviews for select using (true);
create policy "Anyone can update reviews" on reviews for update using (true);

-- Gallery
create policy "Gallery is viewable by everyone" on gallery for select using (true);
create policy "Anyone can insert gallery" on gallery for insert with check (true);
create policy "Anyone can delete gallery" on gallery for delete using (true);

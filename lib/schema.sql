-- Run this SQL in your Supabase SQL Editor

-- Users table
create table users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  password text not null,
  role text default 'customer',
  created_at timestamp default now()
);

-- Insert admin user
insert into users (username, password, role) values ('admin', 'admin123', 'admin');

-- Appointments table
create table appointments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  service text not null,
  date text not null,
  time text not null,
  requests text,
  design text,
  status text default 'Pending',
  created_at timestamp default now()
);

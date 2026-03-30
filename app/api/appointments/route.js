import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET all appointments
export async function GET() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST new appointment
export async function POST(request) {
  const body = await request.json();
  const { name, phone, service, date, time, requests, design } = body;

  if (!name || !phone || !service || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert([{ name, phone, service, date, time, requests, design, status: "Pending" }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0], { status: 201 });
}

// PATCH update appointment status
export async function PATCH(request) {
  const body = await request.json();
  const { id, status } = body;

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function GET(request) {
  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  let query = supabase.from("payments").select("*").order("created_at", { ascending: false });
  if (user_id) query = query.eq("user_id", user_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request) {
  const supabase = getSupabase();
  const body = await request.json();
  const { appointment_id, user_id, service, amount, payment_type, reference_number } = body;

  if (!service || !amount || !payment_type || !reference_number) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("payments")
    .insert([{ appointment_id: appointment_id ?? null, user_id: user_id ?? null, service, amount, payment_type, reference_number, status: "Pending" }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request) {
  const supabase = getSupabase();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("payments")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

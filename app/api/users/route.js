import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PATCH(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const body = await request.json();
  const { id, username, phone, currentPassword, newPassword } = body;

  if (!id) return NextResponse.json({ error: "Missing user id." }, { status: 400 });

  // Change password
  if (currentPassword && newPassword) {
    const { data: user } = await supabase.from("users").select("password").eq("id", id).single();
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    const hashed = await bcrypt.hash(newPassword, 10);
    const { error } = await supabase.from("users").update({ password: hashed }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Password changed successfully." });
  }

  // Update profile
  const updates: any = {};
  if (username) updates.username = username;
  if (phone !== undefined) updates.phone = phone;
  const { data, error } = await supabase.from("users").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

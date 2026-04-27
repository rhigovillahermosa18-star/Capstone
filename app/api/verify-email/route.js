import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email_verified")
    .eq("verification_token", token)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Invalid or expired verification link." }, { status: 400 });
  }

  if (user.email_verified) {
    return NextResponse.json({ message: "Email already verified." });
  }

  await supabase
    .from("users")
    .update({ email_verified: true, verification_token: null })
    .eq("id", user.id);

  return NextResponse.json({ message: "Email verified successfully." });
}

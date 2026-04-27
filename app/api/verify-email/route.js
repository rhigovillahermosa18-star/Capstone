import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId, code } = await request.json();

  if (!userId || !code) {
    return NextResponse.json({ error: "Missing code or user." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email_verified, verification_token")
    .eq("id", userId)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "User not found." }, { status: 400 });
  }

  if (user.email_verified) {
    return NextResponse.json({ message: "Email already verified." });
  }

  if (user.verification_token !== code) {
    return NextResponse.json({ error: "Invalid verification code." }, { status: 400 });
  }

  await supabase
    .from("users")
    .update({ email_verified: true, verification_token: null })
    .eq("id", userId);

  return NextResponse.json({ message: "Email verified successfully!" });
}

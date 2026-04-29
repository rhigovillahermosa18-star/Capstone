import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// POST: send reset code
export async function POST(request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const supabase = getSupabase();
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email")
    .eq("email", email)
    .single();

  if (error || !user) return NextResponse.json({ error: "No account found with that email." }, { status: 404 });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from("users").update({ verification_token: code }).eq("id", user.id);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"Marvelously Polished" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset Code",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#fff8fa;border-radius:16px;border:1px solid #ffd3df">
        <h2 style="color:#ec4899;text-align:center">💅 Marvelously Polished</h2>
        <p style="color:#555">Your password reset code is:</p>
        <div style="text-align:center;margin:24px 0">
          <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#ec4899">${code}</span>
        </div>
        <p style="color:#888;font-size:13px">This code expires in 15 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ userId: user.id });
}

// PATCH: reset password
export async function PATCH(request) {
  const { userId, code, newPassword } = await request.json();
  if (!userId || !code || !newPassword)
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });

  const supabase = getSupabase();
  const { data: user, error } = await supabase
    .from("users")
    .select("verification_token")
    .eq("id", userId)
    .single();

  if (error || !user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  if (user.verification_token !== code) return NextResponse.json({ error: "Invalid code." }, { status: 400 });

  const bcrypt = await import("bcryptjs");
  const hashed = await bcrypt.default.hash(newPassword, 10);

  await supabase.from("users").update({ password: hashed, verification_token: null }).eq("id", userId);

  return NextResponse.json({ message: "Password reset successfully." });
}

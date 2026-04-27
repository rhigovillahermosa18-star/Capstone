import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const body = await request.json();
  const { username, email, phone, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Username, email, and password are required." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const { data, error } = await supabase
    .from("users")
    .insert([{
      username,
      email,
      password: hashedPassword,
      phone: phone ?? "",
      role: "customer",
      email_verified: false,
      verification_token: verificationCode,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Marvelously Polished" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your Verification Code – Marvelously Polished",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #fce7f3;border-radius:16px;">
        <h2 style="color:#ec4899;">Welcome, ${username}! 💅</h2>
        <p style="color:#374151;">Enter this 6-digit code to verify your email:</p>
        <div style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#ec4899;text-align:center;padding:24px;background:#fdf2f8;border-radius:12px;margin:20px 0;">
          ${verificationCode}
        </div>
        <p style="color:#9ca3af;font-size:12px;">This code expires in 10 minutes. If you didn't create this account, ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ message: "Verification code sent to your email.", userId: data.id }, { status: 201 });
}

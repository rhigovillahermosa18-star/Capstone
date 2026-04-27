import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

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
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const { data, error } = await supabase
    .from("users")
    .insert([{
      username,
      email,
      password: hashedPassword,
      phone: phone ?? "",
      role: "customer",
      email_verified: false,
      verification_token: verificationToken,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

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
    subject: "Verify your email – Marvelously Polished",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #fce7f3;border-radius:16px;">
        <h2 style="color:#ec4899;">Welcome, ${username}! 💅</h2>
        <p style="color:#374151;">Please verify your email address to activate your account.</p>
        <a href="${verifyUrl}" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#ec4899;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
          Verify Email
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px;">If you didn't create this account, you can ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ message: "Account created. Please check your email to verify your account." }, { status: 201 });
}

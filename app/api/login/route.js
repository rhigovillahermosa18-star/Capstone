import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  // Admin check
  const adminEmail = process.env.ADMIN_EMAIL || "admin@marvelouslypolished.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === adminEmail && password === adminPassword) {
    const response = NextResponse.json({ role: "admin" });
    response.cookies.set("role", "admin", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  }

  // Find user in users table
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!user.email_verified) {
    return NextResponse.json({ error: "Please verify your email before logging in. Check your inbox." }, { status: 403 });
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ role: "customer", user });
  response.cookies.set("role", "customer", {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      if (error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("email rate")) {
        return NextResponse.json(
          { error: "Too many sign-up attempts. Please wait a few minutes and try again." },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.user?.identities?.length === 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Account created successfully.", user: data.user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error." }, { status: 500 });
  }
}

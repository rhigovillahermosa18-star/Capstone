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

    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (authError) {
      if (authError.message.toLowerCase().includes("rate limit") || authError.message.toLowerCase().includes("email rate")) {
        return NextResponse.json({ error: "Too many sign-up attempts. Please wait a few minutes and try again." }, { status: 429 });
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (authData.user?.identities?.length === 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // Step 2: Insert into users table
    if (authData.user) {
      const { error: dbError } = await supabase
        .from("users")
        .insert([{
          id: authData.user.id,
          username,
          email,
          role: "customer",
        }]);

      if (dbError) {
        console.error("Failed to insert user into users table:", dbError.message);
        // Don't fail the registration if users table insert fails
        // Auth user is already created
      }
    }

    return NextResponse.json(
      { message: "Account created successfully.", user: authData.user },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error." }, { status: 500 });
  }
}

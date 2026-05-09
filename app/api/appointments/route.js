import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  let query = supabase.from("appointments").select("*").order("created_at", { ascending: false });
  if (user_id) query = query.eq("user_id", user_id);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request) {
  const supabase = getSupabase();
  const body = await request.json();
  const { name, phone, email, service, nail_size, date, time, requests, design, design_image, user_id } = body;

  if (!name || !phone || !service || !date || !time) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert([{ user_id: user_id ?? null, name, phone, email: email ?? "", service, nail_size: nail_size ?? "", date, time, requests: requests ?? "", design: design ?? "", design_image: design_image ?? "", status: "Pending" }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request) {
  const supabase = getSupabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
  const supabase = getSupabase();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send email notification when confirmed
  if (status === "Confirmed") {
    try {
      let customerEmail = null;
      let customerName = data.name;

      // Try to get email from users table if user_id exists
      if (data?.user_id) {
        const { data: userData } = await supabase
          .from("users")
          .select("email, username")
          .eq("id", data.user_id)
          .single();
        if (userData?.email) {
          customerEmail = userData.email;
          customerName = userData.username || data.name;
        }
        console.log("User data for email:", userData);
      }

      // Fallback to email stored in appointment
      if (!customerEmail && data?.email) {
        customerEmail = data.email;
      }

      if (customerEmail) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });
        const emailResult = await transporter.sendMail({
          from: `"Marvelously Polished" <${process.env.GMAIL_USER}>`,
          to: customerEmail,
          subject: "Your Appointment is Confirmed! 💅",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #fce7f3;">
              <div style="background: #FFD3DF; padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #111; letter-spacing: 4px; font-size: 20px;">MARVELOUSLY POLISHED</h1>
              </div>
              <div style="padding: 32px;">
                <h2 style="color: #ec4899;">Your Appointment is Confirmed! 🎉</h2>
                <p style="color: #374151;">Hi <strong>${customerName}</strong>,</p>
                <p style="color: #374151;">Great news! Your appointment has been confirmed. Here are your details:</p>
                <div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 20px 0;">
                  <p style="margin: 6px 0; color: #374151;"><strong>Service:</strong> ${data.service}</p>
                  <p style="margin: 6px 0; color: #374151;"><strong>Date:</strong> ${data.date}</p>
                  <p style="margin: 6px 0; color: #374151;"><strong>Time:</strong> ${data.time}</p>
                  <p style="margin: 6px 0; color: #374151;"><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">Confirmed ✅</span></p>
                </div>
                <p style="color: #374151;">We look forward to seeing you! Please arrive a few minutes early.</p>
                <p style="color: #ec4899; font-weight: bold;">Beauty Starts From Tips to Toes 💅</p>
              </div>
              <div style="background: #FFD3DF; padding: 16px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">© 2026 Marvelously Polished. Santa Ana, CA</p>
              </div>
            </div>
          `,
        });
        console.log("Email sent:", emailResult.messageId);
      } else {
        console.log("No email found for appointment:", data.id);
      }
    } catch (emailError) {
      console.error("Email error:", emailError);
    }
  }

  return NextResponse.json(data);
}

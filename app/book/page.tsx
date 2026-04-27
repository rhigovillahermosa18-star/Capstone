"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TOTAL_SLOTS = 4;

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(searchParams.get("service") || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requests, setRequests] = useState("");
  const [design, setDesign] = useState("");
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState<Record<string, number>>({});
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchBookedDates();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
    const res = await fetch(`/api/users?id=${user_id}`);
    const data = await res.json();
    if (res.ok && data) {
      setName(data.username || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
    }
  };

  const fetchBookedDates = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    if (res.ok) {
      const counts: Record<string, number> = {};
      const slots: Record<string, string[]> = {};
      data.forEach((appt: any) => {
        if (appt.status !== "Cancelled") {
          counts[appt.date] = (counts[appt.date] || 0) + 1;
          if (!slots[appt.date]) slots[appt.date] = [];
          slots[appt.date].push(appt.time);
        }
      });
      setBookedDates(counts);
      setBookedSlots(slots);
    }
  };

  const isFullyBooked = (dateStr: string) => (bookedDates[dateStr] || 0) >= TOTAL_SLOTS;
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const formatDate = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(year, month, day);
    if (new Date(dateStr) < today || isFullyBooked(dateStr)) return;
    setDate(dateStr);
  };

  const handleSubmit = async () => {
    if (!name || !phone || !service || !date || !time) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    let designImageUrl = "";
    if (designFile) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
      );
      const fileExt = designFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from("designs").upload(fileName, designFile, { upsert: true });
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from("designs").getPublicUrl(fileName);
        designImageUrl = urlData.publicUrl;
      }
    }
    const user_id = localStorage.getItem("user_id");
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, service, date, time, requests, design, design_image: designImageUrl, user_id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    router.push("/appointments");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-5 py-3 shadow-sm relative z-10 flex items-center justify-between gap-2">
        <Link href="/homepage" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={50} height={50} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.2em] text-base hidden lg:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <Link href="/homepage" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
          <Link href="/book" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
          <Link href="/pricing" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
          <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
          <Link href="/appointments" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 Appointments</Link>
          <Link href="/reviews" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⭐ Reviews</Link>
          <Link href="/payment" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
          <Link href="/settings" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⚙️ Settings</Link>
          <button onClick={async () => { await fetch("/api/logout", { method: "POST" }); localStorage.removeItem("role"); localStorage.removeItem("user_id"); router.push("/"); }} className="bg-gray-200 px-3.5 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
        </div>
      </div>

      {/* Booking Section */}
      <div className="flex-grow flex justify-center px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-start">

          {/* Left - Booking Form */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-pink-100 flex flex-col">
            <h2 className="text-center font-bold mb-2 text-gray-800 text-3xl">Book Your Appointment</h2>
            <p className="text-center text-pink-400 text-sm mb-6">💅 Fill in the details below</p>

            <div className="space-y-4 flex-grow">
              <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
              <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
              <input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition">
                <option value="">Select Service</option>
                <option>Plain Set</option>
                <option>Basic Set</option>
                <option>Full Set</option>
              </select>

              {/* Calendar */}
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="text-pink-500 hover:text-pink-700 font-bold text-lg px-2">‹</button>
                  <p className="font-semibold text-gray-800">{monthName}</p>
                  <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="text-pink-500 hover:text-pink-700 font-bold text-lg px-2">›</button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(year, month, day);
                    const isPast = new Date(dateStr) < today;
                    const fullyBooked = isFullyBooked(dateStr);
                    const isSelected = date === dateStr;
                    const partiallyBooked = (bookedDates[dateStr] || 0) > 0 && !fullyBooked;
                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={isPast || fullyBooked}
                        className={`text-center text-sm py-2 rounded-lg font-medium transition
                          ${isSelected ? "bg-pink-500 text-white"
                          : fullyBooked ? "bg-red-100 text-red-500 line-through cursor-not-allowed"
                          : partiallyBooked ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : isPast ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-pink-100 text-gray-700"}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-4 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 inline-block"></span> Fully Booked</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 inline-block"></span> Partially Booked</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-pink-500 inline-block"></span> Selected</span>
                </div>
                {date && <p className="mt-3 text-sm text-pink-600 font-medium">Selected: {date}</p>}
              </div>

              {/* Time Slots */}
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Select Time</p>
                <div className="grid grid-cols-4 gap-3">
                  {["9:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"].map((slot) => {
                    const taken = date ? (bookedSlots[date] || []).includes(slot) : false;
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => !taken && setTime(slot)}
                        disabled={taken}
                        className={`py-3 rounded-xl text-sm font-semibold transition
                          ${isSelected ? "bg-pink-500 text-white shadow-lg"
                          : taken ? "bg-red-100 text-red-400 line-through cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600"}`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {!date && <p className="text-xs text-gray-400 mt-2">Please select a date first</p>}
              </div>

              <textarea placeholder="Special Requests (optional)" rows={2} value={requests} onChange={(e) => setRequests(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none" />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button onClick={handleSubmit} disabled={loading} className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50">
                {loading ? "Submitting..." : "Confirm Appointment"}
              </button>
            </div>
          </div>

          {/* Right - Design Upload */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-pink-100 flex flex-col gap-6">
              <div>
                <h3 className="text-pink-600 font-bold text-xl mb-1 flex items-center gap-2">💅 Upload Your Desired Design</h3>
                <p className="text-gray-500 text-sm mb-4">Share a photo of the nail design you want (PNG, JPG)</p>
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 bg-pink-50 flex flex-col items-center justify-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setDesignFile(file);
                      if (file) setDesignPreview(URL.createObjectURL(file));
                      else setDesignPreview("");
                    }}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-400 file:text-white hover:file:bg-pink-500 cursor-pointer"
                  />
                  {designPreview ? (
                    <img src={designPreview} alt="Design preview" className="w-full h-64 object-cover rounded-xl mt-2" />
                  ) : (
                    <div className="w-full h-64 bg-pink-100 rounded-xl flex items-center justify-center">
                      <p className="text-gray-400 text-sm">Preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-pink-600 font-bold text-xl mb-2 flex items-center gap-2">✨ Describe Your Design</h3>
                <textarea
                  placeholder="Describe your dream design (e.g. French tips, glitter, floral, color preferences...)"
                  rows={5}
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
                />
              </div>
            </div>

            {/* Nail Care Tips */}
            <div className="bg-gradient-to-br from-pink-100 to-white p-6 rounded-2xl shadow-lg border border-pink-100">
              <h3 className="text-pink-600 font-bold text-xl mb-4 flex items-center gap-2">
                <span>✨</span> Nail Care Tips
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "💧", title: "Stay Hydrated", desc: "Moisturize cuticles daily for healthy nails" },
                  { icon: "🌸", title: "Gentle Filing", desc: "File in one direction to prevent breakage" },
                  { icon: "🛡️", title: "Base Coat", desc: "Always apply base coat for longer lasting color" },
                  { icon: "☀️", title: "Sun Protection", desc: "UV rays can fade your nail color faster" },
                ].map((tip) => (
                  <div key={tip.title} className="bg-white rounded-xl p-3 shadow-sm border border-white">
                    <p className="text-2xl mb-1">{tip.icon}</p>
                    <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Premium nail care in Ylaya, Barili. Where beauty meets artistry.</p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
                <Link href="/payment" className="block text-gray-700 hover:text-pink-600 transition">Payment</Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>📍 Ylaya, Barili, Cebu</p>
                <p>📞 09064455283</p>
                <p>📸 Instagram: marvelously.polished</p>
                <p>⏰ Mon–Sat: 9AM – 7PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-700">
            <p>© 2026 Marvelously Polished. All rights reserved.</p>
            <p>Ylaya, Barili, Cebu | Book Your Glam Today 💅</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function Book() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center"><p className="text-pink-500">Loading...</p></div>}>
      <BookContent />
    </Suspense>
  );
}

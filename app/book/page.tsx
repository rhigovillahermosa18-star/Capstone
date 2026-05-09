"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Book" mode="auth" />

      {/* Booking Section */}
      <div className="flex-grow flex justify-center px-6 py-10 relative z-10">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3">
              <span>💅</span> Book an Appointment
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Appointment</span></h1>
            <p className="text-gray-500 text-sm mt-1">Fill in the details below to schedule your visit</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left - Booking Form */}
          <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border border-pink-100 flex flex-col">
            <h2 className="text-center font-extrabold mb-1 text-gray-800 text-2xl">Your Details</h2>
            <p className="text-center text-gray-400 text-sm mb-6">Fill in your info to book</p>

            <div className="space-y-3 flex-grow">
              <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              <input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50">
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

              <textarea placeholder="Special Requests (optional)" rows={2} value={requests} onChange={(e) => setRequests(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition resize-none bg-gray-50" />

              {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{error}</div>}
              <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {loading ? "Submitting..." : "Confirm Appointment 💅"}
              </button>
            </div>
          </div>

          {/* Right - Design Upload */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border border-pink-100 flex flex-col gap-5">
              <div>
                <h3 className="text-pink-600 font-bold text-lg mb-1 flex items-center gap-2">💅 Upload Your Desired Design</h3>
                <p className="text-gray-400 text-sm mb-3">Share a photo of the nail design you want (PNG, JPG)</p>
                <div className="border-2 border-dashed border-pink-200 rounded-2xl p-5 bg-pink-50/50 flex flex-col items-center gap-3">
                  <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0] || null; setDesignFile(file); if (file) setDesignPreview(URL.createObjectURL(file)); else setDesignPreview(""); }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-pink-400 file:text-white hover:file:shadow-md cursor-pointer" />
                  {designPreview ? (
                    <img src={designPreview} alt="Design preview" className="w-full h-56 object-cover rounded-xl mt-1 shadow-md" />
                  ) : (
                    <div className="w-full h-56 bg-pink-100/50 rounded-xl flex flex-col items-center justify-center gap-2">
                      <span className="text-3xl">🖼️</span>
                      <p className="text-gray-400 text-sm">Preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-pink-600 font-bold text-lg mb-2 flex items-center gap-2">✨ Describe Your Design</h3>
                <textarea placeholder="Describe your dream design (e.g. French tips, glitter, floral, color preferences...)" rows={4} value={design} onChange={(e) => setDesign(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition resize-none bg-gray-50" />
              </div>
            </div>

            {/* Nail Care Tips */}
            <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-xl border border-pink-100">
              <h3 className="text-pink-600 font-bold text-lg mb-4 flex items-center gap-2">✨ Nail Care Tips</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "💧", title: "Stay Hydrated", desc: "Moisturize cuticles daily" },
                  { icon: "🌸", title: "Gentle Filing", desc: "File in one direction" },
                  { icon: "🛡️", title: "Base Coat", desc: "Always apply base coat" },
                  { icon: "☀️", title: "Sun Protection", desc: "UV rays fade nail color" },
                ].map((tip) => (
                  <div key={tip.title} className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-3 border border-pink-100">
                    <p className="text-2xl mb-1">{tip.icon}</p>
                    <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          </div>

        </div>
      </div>

      <Footer isLoggedIn={true} />
    </div>
  );
}

export default function Book() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex items-center justify-center"><p className="text-pink-500 font-medium">Loading...</p></div>}>
      <BookContent />
    </Suspense>
  );
}

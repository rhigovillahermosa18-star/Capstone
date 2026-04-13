"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

const TOTAL_SLOTS = 3;
const popularImages = ["/nail1.jpg","/nail2.jpg","/nail3.jpg","/nail4.jpg","/nail5.jpg","/nail6.jpg","/nail7.jpg","/nail8.jpg","/nail9.jpg","/nail10.jpg","/nail11.jpg"];
const trendingImages = ["/nail5.jpg","/nail6.jpg","/nail7.jpg","/nail8.jpg","/nail9.jpg","/nail10.jpg","/nail11.jpg","/nail1.jpg"];

function Carousel({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="flex flex-col flex-grow">
      <div className="relative overflow-hidden rounded-2xl flex-grow shadow-lg">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((src, i) => (
            <div key={i} className="min-w-full h-28 relative">
              <Image src={src} fill alt={`Design ${i + 1}`} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <button onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-500 rounded-full w-7 h-7 flex items-center justify-center shadow-lg z-10 font-bold">‹</button>
        <button onClick={() => setCurrent((prev) => (prev + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-500 rounded-full w-7 h-7 flex items-center justify-center shadow-lg z-10 font-bold">›</button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-pink-400 w-4 h-2" : "bg-white/60 w-2 h-2"}`} />
          ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full z-10">{current + 1}/{images.length}</div>
      </div>
      <p className="text-xs text-pink-400 text-center mt-2 italic">{label}</p>
    </div>
  );
}

export default function Book() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
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

  useEffect(() => { fetchBookedDates(); }, []);

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

  const isFullyBooked = (d: string) => (bookedDates[d] || 0) >= TOTAL_SLOTS;
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();
  const formatDate = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(year, month, day);
    if (new Date(dateStr) < today || isFullyBooked(dateStr)) return;
    setDate(dateStr);
    setTime("");
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
      body: JSON.stringify({ name, phone, service, date, time, requests, design, design_image: designImageUrl, user_id }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Something went wrong."); setLoading(false); return; }
    router.push("/appointments");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-pink-300 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="bg-white/60 backdrop-blur-md py-5 text-center shadow-sm relative z-10 border-b border-pink-100">
        <Link href="/homepage" className="text-2xl tracking-widest font-bold text-pink-600">
          ✨ MARVELOUSLY POLISHED ✨
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-3 flex justify-center gap-3 relative z-10 flex-wrap px-4">
        {[
          { href: "/homepage", label: "🏠 Home" },
          { href: "/book", label: "📅 Book" },
          { href: "/pricing", label: "💰 Pricing" },
          { href: "/gallery", label: "🖼️ Gallery" },
          { href: "/appointments", label: "💅 My Appointments" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-pink-600 text-sm font-medium hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm border border-pink-100">
            {item.label}
          </Link>
        ))}
        <button
          onClick={async () => { await fetch("/api/logout", { method: "POST" }); localStorage.removeItem("role"); localStorage.removeItem("user_id"); router.push("/login"); }}
          className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-gray-500 text-sm font-medium hover:bg-gray-200 transition-all duration-300 shadow-sm border border-gray-100"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-grow flex justify-center px-4 py-8 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-6 items-start">

          {/* Left - Popular Designs */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-3xl shadow-xl border border-pink-100 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💅</span>
                <div>
                  <h3 className="text-pink-600 font-bold text-base">Popular Designs</h3>
                  <p className="text-xs text-gray-400">Our clients love these</p>
                </div>
              </div>
              <Carousel images={popularImages} label="Tap to explore more styles" />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-2xl border border-pink-100 flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Book Your Appointment</h2>
              <p className="text-pink-400 text-sm mt-1">✨ Let us make your nails beautiful</p>
            </div>

            <div className="space-y-3 flex-grow">
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition text-sm"
              />
              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition text-sm"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-800 focus:outline-none focus:border-pink-400 focus:bg-white transition text-sm"
              >
                <option value="">Select Service 💅</option>
                <option>Plain Set</option>
                <option>Basic Set</option>
                <option>Full Set</option>
              </select>

              {/* Calendar */}
              <div className="bg-pink-50/50 border border-pink-200 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow text-pink-500 hover:bg-pink-500 hover:text-white transition font-bold">‹</button>
                  <p className="font-semibold text-gray-700 text-sm">{monthName}</p>
                  <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow text-pink-500 hover:bg-pink-500 hover:text-white transition font-bold">›</button>
                </div>
                <div className="grid grid-cols-7 mb-1">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-pink-400 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(year, month, day);
                    const isPast = new Date(dateStr) < today;
                    const fullyBooked = isFullyBooked(dateStr);
                    const isSelected = date === dateStr;
                    const partial = (bookedDates[dateStr] || 0) > 0 && !fullyBooked;
                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={isPast || fullyBooked}
                        className={`text-center text-xs py-1.5 rounded-xl font-medium transition-all duration-200
                          ${isSelected ? "bg-pink-500 text-white shadow-md scale-110"
                          : fullyBooked ? "bg-red-100 text-red-400 line-through cursor-not-allowed"
                          : partial ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          : isPast ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-pink-200 hover:text-pink-700 text-gray-600"}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-200 inline-block"></span>Full</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-yellow-200 inline-block"></span>Partial</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block"></span>Selected</span>
                </div>
                {date && <p className="mt-2 text-xs text-pink-500 font-semibold">📅 {date}</p>}
              </div>

              {/* Time Slots */}
              <div className="bg-pink-50/50 border border-pink-200 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">⏰ Select Time</p>
                <div className="grid grid-cols-3 gap-2">
                  {["10:00 AM", "1:00 PM", "4:00 PM"].map((slot) => {
                    const taken = date ? (bookedSlots[date] || []).includes(slot) : false;
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => !taken && setTime(slot)}
                        disabled={taken}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                          ${isSelected ? "bg-pink-500 text-white shadow-md scale-105"
                          : taken ? "bg-red-100 text-red-400 line-through cursor-not-allowed"
                          : "bg-white border border-pink-200 text-gray-600 hover:bg-pink-500 hover:text-white hover:border-pink-500"}`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {!date && <p className="text-xs text-gray-400 mt-2 italic">Select a date first</p>}
              </div>

              <textarea
                placeholder="✍️ Special Requests (optional)"
                rows={2}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition resize-none text-sm"
              />

              {/* Upload */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-dashed border-pink-300 rounded-2xl p-4">
                <p className="text-pink-600 font-semibold text-sm mb-1">💅 Upload Your Desired Design</p>
                <p className="text-gray-400 text-xs mb-3">Share a photo of the nail design you want</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setDesignFile(file);
                    if (file) setDesignPreview(URL.createObjectURL(file));
                    else setDesignPreview("");
                  }}
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-500 file:text-white hover:file:bg-pink-600 cursor-pointer"
                />
                {designPreview && (
                  <div className="mt-3 relative">
                    <img src={designPreview} alt="Preview" className="w-full h-32 object-cover rounded-xl shadow-md" />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">✓ Uploaded</div>
                  </div>
                )}
              </div>

              <textarea
                placeholder="✨ Describe your dream design..."
                rows={2}
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition resize-none text-sm"
              />

              {error && <p className="text-red-500 text-xs text-center bg-red-50 py-2 rounded-xl">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-2xl font-bold text-base hover:from-pink-600 hover:to-rose-500 hover:shadow-xl transition-all duration-300 disabled:opacity-50 shadow-lg"
              >
                {loading ? "✨ Booking..." : "✨ Confirm Appointment"}
              </button>
            </div>
          </div>

          {/* Right - Why Choose Us + Trending */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-3xl shadow-xl border border-pink-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💖</span>
                <div>
                  <h3 className="text-pink-600 font-bold text-base">Why Choose Us</h3>
                  <p className="text-xs text-gray-400">The best nail experience</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "🎨", text: "Professional Nail Artists" },
                  { icon: "✨", text: "Premium Quality Products" },
                  { icon: "🧼", text: "Sanitized Tools & Equipment" },
                  { icon: "🌸", text: "Relaxing Atmosphere" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-pink-50 rounded-xl px-3 py-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-3xl shadow-xl border border-pink-100 flex flex-col gap-3 flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="text-pink-600 font-bold text-base">Trending Now</h3>
                  <p className="text-xs text-gray-400">What's hot this season</p>
                </div>
              </div>
              <Carousel images={trendingImages} label="Latest nail trends just for you" />
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-white/60 backdrop-blur-md relative z-10 pt-10 pb-5 px-6 border-t border-pink-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-pink-600 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-500 text-sm">Premium nail care in Santa Ana. Where beauty meets artistry.</p>
              <p className="text-pink-400 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-700 text-base">Quick Links</h4>
              <div className="space-y-1 text-sm">
                {["/homepage","Home"],["/book","Book Appointment"],["/pricing","Pricing"],["/gallery","Gallery"].map(([href, label]) => (
                  <Link key={href} href={href} className="block text-gray-500 hover:text-pink-500 transition">{label}</Link>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-700 text-base">Contact Us</h4>
              <div className="space-y-1 text-sm text-gray-500">
                <p>📍 Santa Ana, CA</p>
                <p>📞 (714) 000-0000</p>
                <p>📧 hello@marvelouslypolished.com</p>
                <p>⏰ Mon–Sat: 9AM – 7PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-100 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-400">
            <p>© 2026 Marvelously Polished. All rights reserved.</p>
            <p>Santa Ana | Book Your Glam Today 💅</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

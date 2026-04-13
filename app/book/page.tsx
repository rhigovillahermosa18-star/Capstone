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

function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full overflow-hidden rounded-xl flex-grow">
      <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <div key={i} className="min-w-full h-64">
            <Image src={src} fill alt={`Design ${i + 1}`} className="object-cover" />
          </div>
        ))}
      </div>
      <button onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-500 rounded-full w-8 h-8 flex items-center justify-center shadow z-10">‹</button>
      <button onClick={() => setCurrent((prev) => (prev + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-500 rounded-full w-8 h-8 flex items-center justify-center shadow z-10">›</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? "bg-pink-500" : "bg-white/70"}`} />
        ))}
      </div>
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

  useEffect(() => {
    fetchBookedDates();
  }, []);

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

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const handleDayClick = (day: number) => {
    const dateStr = formatDate(year, month, day);
    const clickedDate = new Date(dateStr);
    if (clickedDate < today) return;
    if (isFullyBooked(dateStr)) return;
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
      const fileExt = designFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("designs")
        .upload(fileName, designFile, { upsert: true });
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

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <Link href="/homepage" className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10 flex-wrap">
        <Link href="/homepage" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          🏠 Home
        </Link>
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Book Appointment
        </Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Pricing
        </Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Gallery
        </Link>
        <Link href="/appointments" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          My Appointments
        </Link>
        <button
          onClick={async () => { await fetch("/api/logout", { method: "POST" }); localStorage.removeItem("role"); localStorage.removeItem("user_id"); router.push("/login"); }}
          className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      {/* Booking Section */}
      <div className="flex-grow flex justify-center px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-8 items-stretch">

          {/* Left - Popular Designs */}
          <div className="hidden lg:flex flex-col">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col flex-grow">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span>💅</span> Popular Designs
              </h3>
              <Carousel images={popularImages} />
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col">
            <h2 className="text-center font-bold mb-8 text-black text-3xl">
              Book Your Appointment
            </h2>

            <div className="space-y-4 flex-grow">
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              >
                <option value="">Select Service</option>
                <option>Plain Set</option>
                <option>Basic Set</option>
                <option>Full Set</option>
              </select>
              {/* Custom Calendar */}
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
                          ${ isSelected ? "bg-pink-500 text-white"
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
                <div className="grid grid-cols-3 gap-3">
                  {["10:00 AM", "1:00 PM", "4:00 PM"].map((slot) => {
                    const taken = date ? (bookedSlots[date] || []).includes(slot) : false;
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => !taken && setTime(slot)}
                        disabled={taken}
                        className={`py-3 rounded-xl text-sm font-semibold transition
                          ${ isSelected ? "bg-pink-500 text-white shadow-lg"
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
              <textarea
                placeholder="Special Requests (optional)"
                rows={2}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
              />
              <div className="border-2 border-dashed border-pink-300 rounded-xl p-5 bg-pink-50">
                <p className="text-black font-semibold mb-1">💅 Upload Your Desired Design</p>
                <p className="text-gray-500 text-sm mb-3">Share a photo of the nail design you want (PNG, JPG)</p>
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
                {designPreview && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img src={designPreview} alt="Design preview" className="w-full h-40 object-cover rounded-xl" />
                  </div>
                )}
              </div>
              <textarea
                placeholder="Describe your dream design (e.g. French tips, glitter, floral, color preferences...)"
                rows={2}
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Confirm Appointment"}
              </button>
            </div>
          </div>

          {/* Right - Why Choose Us + Trending */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-black">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💖</span> Why Choose Us
              </h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-2"><span className="text-pink-500">✓</span><span>Professional Nail Artists</span></p>
                <p className="flex items-start gap-2"><span className="text-pink-500">✓</span><span>Premium Quality Products</span></p>
                <p className="flex items-start gap-2"><span className="text-pink-500">✓</span><span>Sanitized Tools & Equipment</span></p>
                <p className="flex items-start gap-2"><span className="text-pink-500">✓</span><span>Relaxing Atmosphere</span></p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col flex-grow">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span>🔥</span> Trending Now
              </h3>
              <Carousel images={trendingImages} />
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Premium nail care in Santa Ana. Where beauty meets artistry.</p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>📍 Santa Ana, CA</p>
                <p>📞 (714) 000-0000</p>
                <p>📧 hello@marvelouslypolished.com</p>
                <p>⏰ Mon–Sat: 9AM – 7PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-700">
            <p>© 2026 Marvelously Polished. All rights reserved.</p>
            <p>Santa Ana | Book Your Glam Today 💅</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

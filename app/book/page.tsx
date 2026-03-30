"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase.js";

export default function Book() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requests, setRequests] = useState("");
  const [design, setDesign] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !service || !date || !time) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase.from("appointments").insert([
        { name, phone, service, date, time, requests, design, status: "Pending" },
      ]);
      if (dbError) throw dbError;
      router.push("/appointments");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          onClick={() => { if (typeof window !== "undefined") localStorage.removeItem("role"); router.push("/login"); }}
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
              <div className="grid grid-cols-2 gap-2 flex-grow">
                <div className="relative h-32"><Image src="/nail1.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail2.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail3.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail4.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail5.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail6.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail7.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail8.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail9.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail10.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail11.jpg" fill alt="Nail Design" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
              </div>
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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              >
                <option value="">Select Time</option>
                <option>10:00 AM</option>
                <option>1:00 PM</option>
                <option>4:00 PM</option>
              </select>
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
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-400 file:text-white hover:file:bg-pink-500 cursor-pointer"
                />
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
              <div className="grid grid-cols-2 gap-2 flex-grow">
                <div className="relative h-32"><Image src="/nail5.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail6.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail7.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail8.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail9.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail10.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail11.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
                <div className="relative h-32"><Image src="/nail1.jpg" fill alt="Trending Nail" className="rounded-xl object-cover hover:scale-105 transition-transform duration-300" /></div>
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const nailImages = ["/nail1.jpg","/nail2.jpg","/nail3.jpg","/nail4.jpg","/nail5.jpg"];

export default function Home() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % nailImages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

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
          <button onClick={handleLogout} className="bg-gray-200 px-3.5 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 pt-16 pb-8 relative z-10 overflow-hidden">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          <div className="text-center lg:text-left space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-pink-600 leading-tight tracking-[0.05em]">
              Beauty Starts From<br/>Tips to Toes 💅
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Experience luxury nail care in Ylaya, Barili. Our artists use premium products to create stunning designs that express your unique style.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Whether you're looking for a simple elegant set or a bold artistic design, we bring your vision to life with precision and care. Every appointment is a personalized experience crafted just for you.
            </p>
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Link href="/book" className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300">
                Book Now
              </Link>
              <Link href="/gallery" className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-300">
                View Gallery
              </Link>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">✓</span>
                <span>Premium Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">✓</span>
                <span>Ylaya, Barili</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Carousel */}
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lg">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {nailImages.map((src, i) => (
                  <div key={i} className="min-w-full">
                    <Image src={src} width={600} height={400} alt={`Nail ${i + 1}`} className="w-full h-80 object-cover" />
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrent((prev) => (prev - 1 + nailImages.length) % nailImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-500 rounded-full w-8 h-8 flex items-center justify-center shadow">‹</button>
              <button onClick={() => setCurrent((prev) => (prev + 1) % nailImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-pink-500 rounded-full w-8 h-8 flex items-center justify-center shadow">›</button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {nailImages.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? "bg-pink-500" : "bg-white/70"}`} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Premium nail care in Ylaya, Barili. Where beauty meets artistry.</p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg text-center">Quick Links</h4>
              <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-sm">
                <Link href="/homepage" className="text-gray-700 hover:text-pink-600 transition">🏠 Home</Link>
                <Link href="/appointments" className="text-gray-700 hover:text-pink-600 transition">📋 Appointments</Link>
                <Link href="/book" className="text-gray-700 hover:text-pink-600 transition">📅 Book</Link>
                <Link href="/reviews" className="text-gray-700 hover:text-pink-600 transition">⭐ Reviews</Link>
                <Link href="/pricing" className="text-gray-700 hover:text-pink-600 transition">💰 Pricing</Link>
                <Link href="/payment" className="text-gray-700 hover:text-pink-600 transition">💳 Payment</Link>
                <Link href="/gallery" className="text-gray-700 hover:text-pink-600 transition">🖼️ Gallery</Link>
                <Link href="/settings" className="text-gray-700 hover:text-pink-600 transition">⚙️ Settings</Link>
              </div>
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
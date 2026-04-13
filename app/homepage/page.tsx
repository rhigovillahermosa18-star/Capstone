"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const nailImages = ["/nail1.jpg","/nail2.jpg","/nail3.jpg","/nail4.jpg","/nail5.jpg","/nail6.jpg","/nail7.jpg","/nail8.jpg","/nail9.jpg","/nail10.jpg","/nail11.jpg"];

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
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <h1 className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </h1>
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
          onClick={handleLogout}
          className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          
          <div className="text-center lg:text-left space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Marvelously<br/>Polished
            </h2>
            <p className="text-xl text-pink-600 font-medium">
              Beauty Starts From Tips to Toes 💅
            </p>
            <p className="text-gray-700 leading-relaxed">
              Experience luxury nail care in Santa Ana. Our artists use premium products to create stunning designs that express your unique style.
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
                <span>Santa Ana</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Image src="/logo1.png" alt="Marvelously Polished Logo" width={200} height={200} className="rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-300" />
            {/* Carousel */}
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-lg">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {nailImages.map((src, i) => (
                  <div key={i} className="min-w-full">
                    <Image src={src} width={400} height={200} alt={`Nail ${i + 1}`} className="w-full h-56 object-cover" />
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

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const nailImages = ["/nail1.jpg","/nail2.jpg","/nail3.jpg","/nail4.jpg","/nail5.jpg"];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const role = document.cookie.split(";").find(c => c.trim().startsWith("role="));
    if (user_id && role) { router.replace("/homepage"); return; }
    if (user_id && !role) { localStorage.removeItem("user_id"); localStorage.removeItem("role"); }
    setReady(true);
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % nailImages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-100 rounded-full opacity-30 blur-2xl" />

      <Navbar active="Home" mode="public" />

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-6 pt-10 pb-8 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <span>💅</span> Premium Nail Salon · Ylaya, Barili
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Beauty Starts From<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Tips to Toes</span>
            </h1>
            <p className="text-gray-500 leading-relaxed text-base max-w-lg mx-auto lg:mx-0">
              Experience luxury nail care crafted just for you. Our artists use premium products to create stunning designs that express your unique style. Whether you prefer simple elegance or bold nail art, we bring your vision to life with care, creativity, and precision — making every visit a relaxing and beautiful experience.
            </p>
            <div className="flex gap-6 justify-center lg:justify-start text-sm text-gray-500 flex-wrap pt-1">
              <div className="flex items-center gap-1.5"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span><span>Premium Products</span></div>
              <div className="flex items-center gap-1.5"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span><span>Expert Artists</span></div>
              <div className="flex items-center gap-1.5"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span><span>Custom Designs</span></div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {nailImages.map((src, i) => (
                  <div key={i} className="min-w-full">
                    <Image src={src} width={600} height={400} alt={`Nail ${i + 1}`} className="w-full h-80 object-cover" />
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrent((prev) => (prev - 1 + nailImages.length) % nailImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-500 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-lg">‹</button>
              <button onClick={() => setCurrent((prev) => (prev + 1) % nailImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-500 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-lg">›</button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {nailImages.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "bg-pink-500 w-5 h-2" : "bg-white/70 w-2 h-2"}`} />
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="flex gap-4 w-full max-w-xl">
              {[{num:"500+",label:"Happy Clients"},{num:"3+",label:"Years Experience"},{num:"100%",label:"Satisfaction"}].map(s => (
                <div key={s.label} className="flex-1 bg-white/80 backdrop-blur rounded-2xl p-3 text-center shadow-sm border border-pink-100">
                  <p className="text-pink-500 font-bold text-lg">{s.num}</p>
                  <p className="text-gray-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer isLoggedIn={false} />
    </div>
  );
}

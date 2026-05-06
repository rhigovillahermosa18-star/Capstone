"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pricing() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
  }, []);

  const handleBook = (service: string) => {
    if (isLoggedIn) router.push(`/book?service=${encodeURIComponent(service)}`);
    else router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Pricing" />

      {/* Hero Banner */}
      <div className="relative z-10 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
          <span>💰</span> Transparent Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Pricing</span>
        </h1>
        <p className="text-gray-500 text-base max-w-lg mx-auto">Premium nail care at fair prices. Choose the set that suits your style.</p>
      </div>

      {/* Pricing Content */}
      <div className="flex-grow flex justify-center items-start relative z-10 px-6 pb-12">
        <div className="max-w-5xl w-full space-y-10">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Plain Set */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-pink-50">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">💅</div>
                <h3 className="font-bold text-2xl mb-1 text-pink-500">Plain Set</h3>
                <p className="text-gray-400 text-sm">Simple & Elegant</p>
              </div>
              <div className="space-y-3 text-black">
                {[["Short","₱400"],["Medium","₱450"],["Long","₱500"]].map(([l,p]) => (
                  <div key={l} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                    <span className="font-medium text-gray-700">{l}</span>
                    <span className="text-lg font-bold text-pink-500">{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleBook("Plain Set")} className="mt-6 w-full bg-pink-50 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-100 transition">Book Now</button>
            </div>

            {/* Basic Set */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-400 p-8 rounded-2xl shadow-2xl hover:-translate-y-2 transition-all duration-300 relative ring-4 ring-pink-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-pink-500 text-xs font-bold px-4 py-1 rounded-full shadow-md">⭐ MOST POPULAR</div>
              <div className="text-center mb-6 mt-2">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">✨</div>
                <h3 className="font-bold text-2xl mb-1 text-white">Basic Set</h3>
                <p className="text-pink-100 text-sm">Most Popular Choice</p>
              </div>
              <div className="space-y-3 text-white">
                {[["Short","₱450"],["Medium","₱500"],["Long","₱550"]].map(([l,p]) => (
                  <div key={l} className="flex justify-between items-center py-2.5 border-b border-pink-300/50 last:border-0">
                    <span className="font-medium">{l}</span>
                    <span className="text-lg font-bold">{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleBook("Basic Set")} className="mt-6 w-full bg-white text-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-50 transition shadow-md">Book Now</button>
            </div>

            {/* Full Set */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-pink-50">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">💎</div>
                <h3 className="font-bold text-2xl mb-1 text-pink-500">Full Set</h3>
                <p className="text-gray-400 text-sm">Premium Experience</p>
              </div>
              <div className="space-y-3 text-black">
                {[["Short","₱600"],["Medium","₱650"],["Long","₱700"]].map(([l,p]) => (
                  <div key={l} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                    <span className="font-medium text-gray-700">{l}</span>
                    <span className="text-lg font-bold text-pink-500">{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleBook("Full Set")} className="mt-6 w-full bg-pink-50 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-100 transition">Book Now</button>
            </div>

          </div>

        </div>
      </div>

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

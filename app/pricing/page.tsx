"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-150px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-150px] w-96 h-96 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-5 w-48 h-48 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="absolute top-0 right-0 w-60 h-60 bg-pink-100 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-200 rounded-full opacity-50 blur-2xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-5 py-3 shadow-sm relative z-10 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={50} height={50} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.2em] text-base hidden lg:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {isLoggedIn === null ? (
            <div className="h-9 w-64 bg-pink-200 rounded-full animate-pulse" />
          ) : isLoggedIn ? (
            <>
              <Link href="/homepage" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
              <Link href="/book" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
              <Link href="/pricing" className="bg-pink-500 text-white px-3.5 py-2 rounded-full text-sm transition">💰 Pricing</Link>
              <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
              <Link href="/appointments" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 Appointments</Link>
              <Link href="/reviews" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⭐ Reviews</Link>
              <Link href="/payment" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
              <Link href="/settings" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⚙️ Settings</Link>
              <button onClick={() => { localStorage.removeItem("role"); localStorage.removeItem("user_id"); fetch("/api/logout", { method: "POST" }); window.location.href = "/"; }} className="bg-gray-200 px-3.5 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
            </>
          ) : (
            <>
              <Link href="/" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
              <Link href="/pricing" className="bg-pink-500 text-white px-3.5 py-2 rounded-full text-sm transition">💰 Pricing</Link>
              <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
              <Link href="/reviews" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⭐ Reviews</Link>
              <Link href="/login" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🔑 Log In</Link>
              <Link href="/register" className="bg-pink-500 text-white px-3.5 py-2 rounded-full text-sm hover:bg-pink-600 transition">✨ Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Pricing Content */}
      <div className="flex-grow flex justify-center items-center relative z-10 px-6 py-12">
        <div className="max-w-5xl w-full">
          
          <h2 className="text-4xl font-bold mb-12 text-black text-center">
            Our Pricing 💅
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Plain Set */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-pink-500">Plain Set</h3>
                <p className="text-gray-600 text-sm">Simple & Elegant</p>
              </div>
              <div className="space-y-4 text-black">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Short</span>
                  <span className="text-xl font-bold text-pink-500">₱400</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Medium</span>
                  <span className="text-xl font-bold text-pink-500">₱450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Long</span>
                  <span className="text-xl font-bold text-pink-500">₱500</span>
                </div>
              </div>
              <button onClick={() => handleBook("Plain Set")} className="mt-6 block w-full bg-pink-100 text-pink-600 py-3 rounded-xl font-semibold text-center hover:bg-pink-200 transition">Book Now</button>
            </div>

            {/* Basic Set */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-400 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
              <div className="absolute top-4 right-4 bg-white text-pink-500 text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-white">Basic Set</h3>
                <p className="text-pink-100 text-sm">Most Popular Choice</p>
              </div>
              <div className="space-y-4 text-white">
                <div className="flex justify-between items-center pb-3 border-b border-pink-300">
                  <span className="font-medium">Short</span>
                  <span className="text-xl font-bold">₱450</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-pink-300">
                  <span className="font-medium">Medium</span>
                  <span className="text-xl font-bold">₱500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Long</span>
                  <span className="text-xl font-bold">₱550</span>
                </div>
              </div>
              <button onClick={() => handleBook("Basic Set")} className="mt-6 block w-full bg-white text-pink-500 py-3 rounded-xl font-semibold text-center hover:bg-pink-50 transition">Book Now</button>
            </div>

            {/* Full Set */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-pink-500">Full Set</h3>
                <p className="text-gray-600 text-sm">Premium Experience</p>
              </div>
              <div className="space-y-4 text-black">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Short</span>
                  <span className="text-xl font-bold text-pink-500">₱600</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium">Medium</span>
                  <span className="text-xl font-bold text-pink-500">₱650</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Long</span>
                  <span className="text-xl font-bold text-pink-500">₱700</span>
                </div>
              </div>
              <button onClick={() => handleBook("Full Set")} className="mt-6 block w-full bg-pink-100 text-pink-600 py-3 rounded-xl font-semibold text-center hover:bg-pink-200 transition">Book Now</button>
            </div>

          </div>

        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-3 gap-8 mb-10">

            {/* Brand */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Premium nail care in Ylaya, Barili. Where beauty meets artistry.
              </p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg text-center">Quick Links</h4>
              {isLoggedIn ? (
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
              ) : (
                <div className="space-y-1 text-sm">
                  <Link href="/" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                  <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                  <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
                  <Link href="/reviews" className="block text-gray-700 hover:text-pink-600 transition">Reviews</Link>
                  <Link href="/login" className="block text-gray-700 hover:text-pink-600 transition">Log In</Link>
                  <Link href="/register" className="block text-gray-700 hover:text-pink-600 transition">Sign Up</Link>
                </div>
              )}
            </div>

            {/* Contact */}
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
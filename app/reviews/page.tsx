"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; comment: string; created_at: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
    fetch("/api/reviews").then(r => r.json()).then(d => { setReviews(d); setLoading(false); });
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl" />

      {/* Header + Nav */}
      <div className="bg-[#FFD3DF] px-5 py-3 shadow-sm relative z-10 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={50} height={50} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.2em] text-base hidden lg:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {isLoggedIn ? (
            <>
              <Link href="/homepage" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
              <Link href="/book" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
              <Link href="/pricing" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
              <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
              <Link href="/appointments" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 Appointments</Link>
              <Link href="/payment" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
              <Link href="/settings" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⚙️ Settings</Link>
              <button onClick={() => { localStorage.removeItem("role"); localStorage.removeItem("user_id"); fetch("/api/logout", { method: "POST" }); window.location.href = "/"; }} className="bg-gray-200 px-3.5 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
            </>
          ) : (
            <>
              <Link href="/" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
              <Link href="/pricing" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
              <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
              <Link href="/reviews" className="bg-pink-500 text-white px-3.5 py-2 rounded-full text-sm transition">⭐ Reviews</Link>
              <Link href="/login" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🔑 Log In</Link>
              <Link href="/register" className="bg-pink-500 text-white px-3.5 py-2 rounded-full text-sm hover:bg-pink-600 transition">✨ Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">⭐ Customer Reviews</h2>
          <p className="text-center text-gray-500 text-sm mb-4">What our clients say about us</p>

          {/* Summary */}
          {reviews.length > 0 && (
            <div className="flex justify-center mb-10">
              <div className="bg-white rounded-2xl px-10 py-6 shadow-lg border border-pink-100 text-center">
                <p className="text-5xl font-bold text-pink-500">{avgRating}</p>
                <p className="text-yellow-400 text-2xl mt-1">{"★".repeat(Math.round(Number(avgRating)))}{"☆".repeat(5 - Math.round(Number(avgRating)))}</p>
                <p className="text-gray-500 text-sm mt-1">Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No reviews yet. Be the first after your appointment!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                        {r.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-gray-800">{r.name}</p>
                    </div>
                    <span className="text-yellow-400 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                  {r.created_at && (
                    <p className="text-gray-300 text-xs mt-3">{new Date(r.created_at).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/register" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition shadow-lg">
              Book Your Appointment
            </Link>
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
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
                <Link href="/reviews" className="block text-gray-700 hover:text-pink-600 transition">Reviews</Link>
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

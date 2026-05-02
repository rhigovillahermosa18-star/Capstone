"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Reviews() {
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; comment: string; created_at: string }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
    fetch("/api/reviews", { cache: "no-store" }).then(r => r.json()).then(d => { setReviews(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Reviews" />

      {/* Hero Banner */}
      <div className="relative z-10 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
          <span>⭐</span> Client Reviews
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Clients Say</span>
        </h1>
        <p className="text-gray-500 text-base max-w-lg mx-auto mb-4">Real experiences from our happy clients</p>
        {reviews.length > 0 && (
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur border border-pink-100 rounded-2xl px-6 py-3 shadow-sm">
            <span className="text-pink-500 font-extrabold text-3xl">{avgRating}</span>
            <div>
              <div className="text-yellow-400 text-lg">{"★".repeat(Math.round(Number(avgRating)))}{"☆".repeat(5 - Math.round(Number(avgRating)))}</div>
              <p className="text-gray-400 text-xs">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-400 py-12">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">💅</p>
              <p className="text-gray-400 text-lg">No reviews yet. Be the first after your appointment!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl p-5 shadow-lg border border-pink-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow">
                      {r.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{r.name}</p>
                      {r.created_at && <p className="text-gray-300 text-xs">{new Date(r.created_at).toLocaleDateString()}</p>}
                    </div>
                    <span className="ml-auto text-yellow-400 text-base tracking-wide">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-pink-50 pt-3 italic">&ldquo;{r.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href={isLoggedIn ? "/book" : "/login"} className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300 shadow-md">
              💅 Book Your Appointment
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const allImages = [
  { src: "/nail1.jpg", category: "Gel" },
  { src: "/nail2.jpg", category: "Acrylic" },
  { src: "/nail3.jpg", category: "Gel" },
  { src: "/nail4.jpg", category: "Nail Art" },
  { src: "/nail5.jpg", category: "Acrylic" },
  { src: "/nail6.jpg", category: "Nail Art" },
  { src: "/nail7.jpg", category: "Gel" },
  { src: "/nail8.jpg", category: "Acrylic" },
  { src: "/nail9.jpg", category: "Nail Art" },
  { src: "/nail10.jpg", category: "Gel" },
  { src: "/nail11.jpg", category: "Acrylic" },
  { src: "/nail12.jpg", category: "Nail Art" },
];

export default function Gallery() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const categories = ["All", "Gel", "Acrylic", "Nail Art"];
  const filtered = activeCategory === "All" ? allImages : allImages.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Gallery" />

      {/* Gallery Content */}
      <div className="flex-grow relative z-10 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
              <span>🖼️</span> Our Work
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Nail <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Gallery</span>
            </h1>
            <p className="text-gray-500 text-base mt-2">Browse our latest nail designs and get inspired</p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat ? "bg-pink-500 text-white shadow-md" : "bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-pink-100"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div key={i} onClick={() => setLightbox(img.src)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <Image src={img.src} width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                </div>
                <span className="absolute top-2 right-2 bg-white/80 text-pink-600 text-xs font-semibold px-2 py-0.5 rounded-full">{img.category}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="Nail design" className="w-full rounded-2xl shadow-2xl" />
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 bg-white/90 text-gray-700 rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-white transition">✕</button>
          </div>
        </div>
      )}

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
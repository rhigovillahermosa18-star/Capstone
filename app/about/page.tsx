"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user_id"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="About Us" />

      {/* Hero Banner */}
      <div className="relative z-10 py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
          <span>💖</span> Our Story
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Us</span>
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto">Get to know the people and passion behind Marvelously Polished</p>
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Who We Are */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-8 items-center border border-pink-100">
            <div className="flex-shrink-0">
              <Image src="/logo1.png" alt="Marvelously Polished" width={160} height={160} className="rounded-full border-4 border-pink-200 shadow-xl" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-pink-600">Who We Are</h2>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-pink-500">Marvelously Polished</span> is a premium nail salon located in Ylaya, Barili, Cebu. We are passionate about nail artistry and dedicated to making every client feel beautiful, confident, and pampered.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Founded with a love for creativity and beauty, our salon offers a warm, relaxing environment where you can sit back, unwind, and let our skilled nail artists bring your vision to life — from simple elegant sets to bold, intricate designs.
              </p>
              <p className="text-pink-600 font-semibold italic">&ldquo;Beauty Starts From Tips to Toes 💅&rdquo;</p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-2xl shadow-lg p-8 text-white space-y-3">
              <p className="text-3xl">🎯</p>
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-pink-100 leading-relaxed text-sm">
                To provide exceptional nail care services that celebrate individuality and self-expression. We strive to deliver a luxurious experience using premium products, skilled artistry, and genuine care for every client who walks through our doors.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100 space-y-3">
              <p className="text-3xl">🌟</p>
              <h3 className="text-xl font-bold text-pink-600">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                To be the most trusted and beloved nail salon in Barili, Cebu — a place where beauty, creativity, and community come together. We envision a salon where every client leaves feeling more confident and beautiful than when they arrived.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose Us? 💖</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "✨", title: "Expert Nail Artists", desc: "Our team has years of experience crafting beautiful, precise nail designs for every style and occasion." },
                { icon: "💎", title: "Premium Products", desc: "We use only top-quality gel and acrylic products that are safe, long-lasting, and vibrant." },
                { icon: "🌸", title: "Relaxing Atmosphere", desc: "Our salon is designed to be a peaceful retreat — clean, cozy, and welcoming for every visit." },
                { icon: "💅", title: "Custom Designs", desc: "From simple classics to intricate nail art, we tailor every set to match your unique personality." },
                { icon: "❤️", title: "Client-First Approach", desc: "Your satisfaction is our priority. We listen, we care, and we go the extra mile for every client." },
                { icon: "📅", title: "Easy Booking", desc: "Book your appointment online anytime — quick, simple, and hassle-free through our website." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
            <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Visit Us 📍</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-3xl">📍</p>
                <h4 className="font-bold text-gray-800">Location</h4>
                <p className="text-gray-600 text-sm">Ylaya, Barili, Cebu</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl">⏰</p>
                <h4 className="font-bold text-gray-800">Hours</h4>
                <p className="text-gray-600 text-sm">Monday – Saturday<br />9:00 AM – 7:00 PM</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl">📞</p>
                <h4 className="font-bold text-gray-800">Contact</h4>
                <p className="text-gray-600 text-sm">09064455283<br />📸 marvelously.polished</p>
              </div>
            </div>
          </div>

          {/* Founder */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-2xl shadow-xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-4 border-white/30">
              <Image src="/founder.jpg" alt="Marvelous Felaine Villahermosa" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-pink-100 mb-1">Founder & Lead Artist</p>
              <h3 className="text-2xl font-extrabold mb-2">Marvelous Felaine Villahermosa</h3>
              <p className="text-pink-100 text-sm leading-relaxed">With a passion for nail artistry and a commitment to making every client feel beautiful, Marvelous Felaine Villahermosa founded Marvelously Polished in May 2024 to bring premium nail care to Barili, Cebu. Every set is crafted with love, precision, and creativity.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href={isLoggedIn ? "/book" : "/register"} className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300 shadow-md">
              💅 Book Your Appointment
            </Link>
          </div>

        </div>
      </div>

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}

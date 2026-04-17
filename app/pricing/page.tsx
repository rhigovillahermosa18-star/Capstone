"use client";

import Link from "next/link";
import Image from "next/image";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-150px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-150px] w-96 h-96 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-5 w-48 h-48 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>
      <div className="absolute top-0 right-0 w-60 h-60 bg-pink-100 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-200 rounded-full opacity-50 blur-2xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-6 py-3 shadow-sm relative z-10 flex items-center justify-between flex-wrap gap-3">
        <Link href="/homepage">
          <Image src="/logo1.png" alt="Logo" width={55} height={55} className="rounded-full border-2 border-white shadow" />
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/homepage" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
          <Link href="/book" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
          <Link href="/pricing" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
          <Link href="/gallery" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
          <Link href="/appointments" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 My Appointments</Link>
          <Link href="/payment" className="bg-[#FFB6C9] px-4 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
          <Link href="/login" onClick={() => localStorage.removeItem("role")} className="bg-gray-200 px-4 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</Link>
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
              <Link href="/book?service=Plain+Set" className="mt-6 block w-full bg-pink-100 text-pink-600 py-3 rounded-xl font-semibold text-center hover:bg-pink-200 transition">Book Now</Link>
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
              <Link href="/book?service=Basic+Set" className="mt-6 block w-full bg-white text-pink-500 py-3 rounded-xl font-semibold text-center hover:bg-pink-50 transition">Book Now</Link>
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
              <Link href="/book?service=Full+Set" className="mt-6 block w-full bg-pink-100 text-pink-600 py-3 rounded-xl font-semibold text-center hover:bg-pink-200 transition">Book Now</Link>
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
                Premium nail care in Santa Ana. Where beauty meets artistry.
              </p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/payment" className="block text-gray-700 hover:text-pink-600 transition">Payment</Link>
              </div>
            </div>

            {/* Contact */}
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
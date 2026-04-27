"use client";

import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-6 py-3 shadow-sm relative z-10 flex items-center justify-between flex-wrap gap-3">
        <Link href="/homepage" className="flex items-center gap-3">
          <Image src="/logo1.png" alt="Logo" width={55} height={55} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.3em] text-lg hidden md:block">MARVELOUSLY POLISHED</span>
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

      {/* Gallery Content */}
      <div className="flex-grow relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center font-bold mb-12 text-black text-4xl tracking-wide">
            Our Work 💅
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail1.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail2.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail3.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail4.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail5.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail6.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail7.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail8.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail9.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail10.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image src="/nail11.jpg" width={400} height={400} alt="Nail design" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
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
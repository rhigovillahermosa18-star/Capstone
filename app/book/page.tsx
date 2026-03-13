"use client";

import Link from "next/link";
import Image from "next/image";

export default function Book() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <Link
          href="/homepage"
          className="text-3xl tracking-widest font-semibold text-black"
        >
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10">
        <Link
          href="/book"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Book Appointment
        </Link>

        <Link
          href="/pricing"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Pricing
        </Link>

        <Link
          href="/gallery"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Gallery
        </Link>
      </div>

      {/* Booking Section */}
      <div className="flex flex-grow justify-center items-start gap-8 px-10 py-10 relative z-10">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col gap-4 w-64">

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-black font-semibold mb-2">Popular Nails 💅</h3>

            <Image
              src="/nail1.jpg"
              width={220}
              height={150}
              alt="Nail Design"
              className="rounded-lg mb-2"
            />

            <Image
              src="/nail2.jpg"
              width={220}
              height={150}
              alt="Nail Design"
              className="rounded-lg"
            />
          </div>

        </div>


        {/* Booking Form */}
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

          <h2 className="text-center font-bold mb-6 text-black text-2xl">
            Book Appointment 💅
          </h2>

          <input
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <input
            placeholder="Phone Number"
            className="w-full mb-3 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <select className="w-full mb-3 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300">
            <option>Select Service</option>
            <option>Plain Set</option>
            <option>Basic Set</option>
            <option>Full Set</option>
          </select>

          <input
            type="date"
            className="w-full mb-3 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <select className="w-full mb-3 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300">
            <option>Select Time</option>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <textarea
            placeholder="Special Requests (optional)"
            className="w-full mb-4 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button className="w-full bg-pink-400 text-white py-3 rounded hover:bg-pink-500 transition">
            Submit Appointment
          </button>

        </div>


        {/* Right Panel */}
        <div className="hidden lg:flex flex-col gap-4 w-64">

          <div className="bg-white p-4 rounded-xl shadow-md text-black">
            <h3 className="font-semibold mb-2">Why Choose Us 💖</h3>
            <p>⭐ Professional Nail Artists</p>
            <p>⭐ Quality Nail Products</p>
            <p>⭐ Clean Tools</p>
            <p>⭐ Relaxing Experience</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-black font-semibold mb-2">Trending Design</h3>

            <Image
              src="/nail3.jpg"
              width={220}
              height={150}
              alt="Trending Nail"
              className="rounded-lg"
            />
          </div>

        </div>

      </div>
    
    <footer className="bg-[#FFD3DF] text-center py-6 relative z-10">
        <p className="text-black font-medium">
          © 2026 Marvelously Polished
        </p>

        <p className="text-sm text-black mt-1">
          Santa Ana | Book Your Glam Today 💅
        </p>
      </footer>
      
    </div>
  );
}
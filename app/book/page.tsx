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
      <div className="flex-grow flex justify-center items-center px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-8">

          {/* Left Info Card */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span>💅</span> Popular Designs
              </h3>
              <div className="space-y-3">
                <Image
                  src="/nail1.jpg"
                  width={400}
                  height={600}
                  alt="Nail Design"
                  className="rounded-xl w-full h-100 object-cover"
                />
                <Image
                  src="/nail2.jpg"
                  width={400}
                  height={600}
                  alt="Nail Design"
                  className="rounded-xl w-full h-100 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-5 rounded-2xl shadow-2xl">
            <h2 className="text-center font-bold mb-8 text-black text-3xl">
              Book Your Appointment
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />

              <input
                placeholder="Phone Number"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />

              <select className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition">
                <option>Select Service</option>
                <option>Plain Set</option>
                <option>Basic Set</option>
                <option>Full Set</option>
              </select>

              <input
                type="date"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />

              <select className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition">
                <option>Select Time</option>
                <option>10:00 AM</option>
                <option>1:00 PM</option>
                <option>4:00 PM</option>
              </select>

              <textarea
                placeholder="Special Requests (optional)"
                rows={3}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
              />

              <button className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300">
                Confirm Appointment
              </button>
            </div>
          </div>

          {/* Right Info Card */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-black">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💖</span> Why Choose Us
              </h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>Professional Nail Artists</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>Premium Quality Products</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>Sanitized Tools & Equipment</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>Relaxing Atmosphere</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-black font-bold text-lg mb-3">Trending Now</h3>
              <Image
                src="/nail3.jpg"
                width={400}
                height={600}
                alt="Trending Nail"
                className="rounded-xl w-full h-100 object-cover"
              />
            </div>
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
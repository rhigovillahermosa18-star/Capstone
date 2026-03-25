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
        <Link href="/homepage" className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10">
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Book Appointment
        </Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Pricing
        </Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Gallery
        </Link>
      </div>

      {/* Booking Section */}
      <div className="flex-grow flex justify-center items-start px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-8 items-start">

          {/* Left Info Card */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span>💅</span> Popular Designs
              </h3>
              <div className="space-y-3">
                <Image
                  src="/nail1.jpg"
                  width={400}
                  height={400}
                  alt="Nail Design"
                  className="rounded-xl w-full h-48 object-cover"
                />
                <Image
                  src="/nail2.jpg"
                  width={400}
                  height={400}
                  alt="Nail Design"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
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
                rows={2}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
              />

              {/* Design Upload Section */}
              <div className="border-2 border-dashed border-pink-300 rounded-xl p-5 bg-pink-50">
                <p className="text-black font-semibold mb-1">💅 Upload Your Desired Design</p>
                <p className="text-gray-500 text-sm mb-3">Share a photo of the nail design you want (PNG, JPG)</p>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-400 file:text-white hover:file:bg-pink-500 cursor-pointer"
                />
              </div>

              <textarea
                placeholder="Describe your dream design (e.g. French tips, glitter, floral, color preferences...)"
                rows={2}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
              />

              <button className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300">
                Confirm Appointment
              </button>
            </div>
          </div>

          {/* Right Info Card */}
          <div className="hidden lg:flex flex-col gap-6">
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
                height={400}
                alt="Trending Nail"
                className="rounded-xl w-full h-48 object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-3 gap-8 mb-10">

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Premium nail care in Santa Ana. Where beauty meets artistry.
              </p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
              </div>
            </div>

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

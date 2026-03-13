"use client";

import Link from "next/link";

export default function Book() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col">

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm">
        <Link href="/homepage" className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4">
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Book Appointment
        </Link>

        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Pricing
        </Link>

        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Gallery
        </Link>
      </div>

      {/* Booking Form */}
      <div className="flex justify-center pt-10 pb-10">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

          <h2 className="text-center font-bold mb-6 text-black text-2xl">
            Book Appointment 💅
          </h2>

          <input
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded text-black"
          />

          <input
            placeholder="Phone Number"
            className="w-full mb-3 p-3 border rounded text-black"
          />

          <select className="w-full mb-3 p-3 border rounded text-black">
            <option>Select Service</option>
            <option>Plain Set</option>
            <option>Basic Set</option>
            <option>Gel Polish</option>
            <option>Nail Art</option>
          </select>

          <input
            type="date"
            className="w-full mb-3 p-3 border rounded text-black"
          />

          <select className="w-full mb-3 p-3 border rounded text-black">
            <option>Select Time</option>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <textarea
            placeholder="Special Requests (optional)"
            className="w-full mb-4 p-3 border rounded text-black"
          />

          <button className="w-full bg-pink-400 text-white py-3 rounded hover:bg-pink-500 transition">
            Submit Appointment
          </button>

        </div>
      </div>

    </div>
  );
}
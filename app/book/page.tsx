"use client";

import Link from "next/link";

export default function Book() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col">

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center">
        <Link href="/homepage" className="text-3xl tracking-widest font-medium text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex justify-center gap-4">
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
      <div className="flex flex-grow justify-center items-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-80">

          <h2 className="text-center font-semibold mb-4 text-black text-xl">
            Book Appointment 💅
          </h2>

          <input
            placeholder="Full Name"
            className="w-full mb-3 p-2 border rounded text-black"
          />

          <input
            type="date"
            className="w-full mb-3 p-2 border rounded text-black"
          />

          <select className="w-full mb-3 p-2 border rounded text-black">
            <option>Select a time</option>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <button className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition">
            Submit
          </button>

        </div>
      </div>

    </div>
  );
}
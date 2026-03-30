"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase.js";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  requests: string;
  design: string;
  status: string;
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAppointments(data);
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "Cancelled" })
      .eq("id", id);
    if (!error) fetchAppointments();
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <Link href="/homepage" className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10 flex-wrap">
        <Link href="/homepage" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          🏠 Home
        </Link>
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Book Appointment
        </Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Pricing
        </Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Gallery
        </Link>
        <Link
          href="/login"
          onClick={() => localStorage.removeItem("role")}
          className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </Link>
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">My Appointments</h2>
          <p className="text-center text-gray-600 mb-10">View and manage your upcoming nail appointments</p>

          {loading ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <p className="text-gray-500 text-lg">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <p className="text-5xl mb-4">💅</p>
              <p className="text-gray-600 text-lg mb-6">You have no appointments yet.</p>
              <Link
                href="/book"
                className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 transition"
              >
                Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-100 text-2xl w-14 h-14 rounded-full flex items-center justify-center">
                      💅
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{appt.name}</p>
                      <p className="text-gray-600 text-sm">{appt.service}</p>
                      {appt.design && <p className="text-pink-500 text-xs mt-1">Design: {appt.design}</p>}
                    </div>
                  </div>

                  <div className="flex gap-8 text-sm text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-800">📅 Date</p>
                      <p>{appt.date}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">⏰ Time</p>
                      <p>{appt.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      appt.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : appt.status === "Cancelled"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {appt.status}
                    </span>
                    {appt.status !== "Cancelled" && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-200 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
            >
              + Book New Appointment
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Premium nail care in Santa Ana. Where beauty meets artistry.</p>
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

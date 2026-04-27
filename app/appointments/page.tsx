"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

type Payment = {
  id: string;
  appointment_id: string;
  status: string;
};

export default function Appointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const [apptRes, payRes] = await Promise.all([
        fetch(`/api/appointments${user_id ? `?user_id=${user_id}` : ""}`),
        fetch(`/api/payments${user_id ? `?user_id=${user_id}` : ""}`),
      ]);
      const apptData = await apptRes.json();
      const payData = await payRes.json();
      if (apptRes.ok) setAppointments(apptData);
      if (payRes.ok) setPayments(payData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hasPaid = (apptId: string) =>
    payments.some((p) => p.appointment_id === apptId && (p.status === "Pending" || p.status === "Verified"));

  const handleCancel = async (id: string) => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "Cancelled" }),
    });
    fetchAppointments();
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-5 py-3 shadow-sm relative z-10 flex items-center justify-between gap-2">
        <Link href="/homepage" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={50} height={50} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.2em] text-sm hidden xl:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <Link href="/homepage" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
          <Link href="/book" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
          <Link href="/pricing" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
          <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
          <Link href="/appointments" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 Appointments</Link>
          <Link href="/payment" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💳 Payment</Link>
          <Link href="/settings" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⚙️ Settings</Link>
          <button onClick={handleLogout} className="bg-gray-200 px-3.5 py-2 rounded-full text-gray-700 text-sm hover:bg-gray-300 transition">🚪 Logout</button>
        </div>
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
              <Link href="/book" className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 transition">
                Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-100 text-2xl w-14 h-14 rounded-full flex items-center justify-center">💅</div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{appt.name}</p>
                      <p className="text-gray-600 text-sm">{appt.service}</p>
                      {appt.design && <p className="text-pink-500 text-xs mt-1">Design: {appt.design}</p>}
                      {appt.design_image && (
                        <img src={appt.design_image} alt="Design" className="mt-2 w-24 h-24 object-cover rounded-xl border-2 border-pink-200" />
                      )}
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
                      appt.status === "Confirmed" ? "bg-green-100 text-green-600"
                      : appt.status === "Cancelled" ? "bg-red-100 text-red-500"
                      : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {appt.status}
                    </span>
                    {appt.status !== "Cancelled" && (
                      <div className="flex gap-2">
                        {!hasPaid(appt.id) && (
                          <Link
                            href={`/payment?service=${encodeURIComponent(appt.service)}&id=${appt.id}&name=${encodeURIComponent(appt.name)}`}
                            className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition"
                          >
                            💳 Pay
                          </Link>
                        )}
                        {hasPaid(appt.id) ? (
                          <span className="bg-gray-100 text-gray-400 px-4 py-2 rounded-full text-sm font-semibold cursor-not-allowed" title="No refunds after payment">
                            🚫 No Refund
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCancel(appt.id)}
                            className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-200 transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/book" className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300">
              + Book New Appointment
            </Link>
          </div>

        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Premium nail care in Ylaya, Barili. Where beauty meets artistry.</p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
                <Link href="/payment" className="block text-gray-700 hover:text-pink-600 transition">Payment</Link>
              </div>
            </div>
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
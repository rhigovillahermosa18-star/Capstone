"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  design: string;
  status: string;
};

export default function Admin() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role !== "admin") {
      router.replace("/login");
    } else {
      setAuthorized(true);
      fetchAppointments();
    }
  }, [router]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAppointments();
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    router.push("/login");
  };

  const stats = [
    { label: "Total Bookings", value: appointments.length, icon: "📋" },
    { label: "Confirmed", value: appointments.filter(a => a.status === "Confirmed").length, icon: "✅" },
    { label: "Pending", value: appointments.filter(a => a.status === "Pending").length, icon: "⏳" },
    { label: "Cancelled", value: appointments.filter(a => a.status === "Cancelled").length, icon: "❌" },
  ];

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <span className="text-3xl tracking-widest font-semibold text-black">MARVELOUSLY POLISHED</span>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10 flex-wrap">
        <span className="bg-pink-500 px-5 py-2 rounded-full text-white font-semibold">Admin Panel</span>
        <button onClick={handleLogout} className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Admin Panel</h2>
          <p className="text-center text-gray-600 mb-10">Manage all appointments and customer requests</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-pink-500">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">All Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="text-left p-4 text-gray-700 font-semibold">Customer</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Phone</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Service</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Design Request</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Date & Time</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Status</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr><td colSpan={7} className="p-8 text-center text-gray-500">No appointments yet.</td></tr>
                  ) : appointments.map((appt, i) => (
                    <tr key={appt.id} className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                      <td className="p-4 font-medium text-gray-800">{appt.name}</td>
                      <td className="p-4 text-gray-600">{appt.phone}</td>
                      <td className="p-4 text-gray-600">{appt.service}</td>
                      <td className="p-4 text-gray-600">{appt.design}</td>
                      <td className="p-4 text-gray-600">{appt.date} {appt.time}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appt.status === "Confirmed" ? "bg-green-100 text-green-600"
                          : appt.status === "Cancelled" ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => updateStatus(appt.id, "Confirmed")} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition">
                            Confirm
                          </button>
                          <button onClick={() => updateStatus(appt.id, "Cancelled")} className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

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
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
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

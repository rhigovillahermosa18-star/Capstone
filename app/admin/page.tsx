"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
};

type Payment = {
  id: string;
  customer_name: string;
  service: string;
  amount: number;
  payment_type: string;
  screenshot_url: string;
  status: string;
  created_at: string;
};

export default function Admin() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"appointments" | "users" | "payments" | "chart" | "reviews">("appointments");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<{ id: string; name: string; rating: number; comment: string; created_at: string; status: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role !== "admin") {
      router.replace("/login");
    } else {
      setAuthorized(true);
      fetchAppointments();
      fetchUsers();
      fetchPayments();
      fetchReviews();
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

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      const data = await res.json();
      if (res.ok) setPayments(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?all=true");
      const data = await res.json();
      if (res.ok) setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const updateReviewStatus = async (id: string, status: string) => {
    const res = await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert("Failed to update review: " + (data.error || "Unknown error"));
      return;
    }
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    fetchReviews();
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    await fetch("/api/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchPayments();
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
    router.push("/");
  };

  const stats = [
    { label: "Total Bookings", value: appointments.length, icon: "📋" },
    { label: "Confirmed", value: appointments.filter(a => a.status === "Confirmed").length, icon: "✅" },
    { label: "Pending", value: appointments.filter(a => a.status === "Pending").length, icon: "⏳" },
    { label: "Total Users", value: users.length, icon: "👥" },
    { label: "Payments", value: payments.length, icon: "💳" },
    { label: "Revenue", value: `₱${payments.filter(p => p.status === "Verified").reduce((s, p) => s + Number(p.amount), 0).toLocaleString()}`, icon: "💰" },
  ];

  if (!authorized) return null;

  return (
    <div className="h-screen bg-[#FFE4EF] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-[#FFD3DF] py-4 px-6 shadow-sm z-10 flex items-center justify-between flex-shrink-0">
        <span className="text-2xl tracking-widest font-semibold text-black">MARVELOUSLY POLISHED</span>
        <button onClick={handleLogout} className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition">
          🚪 Logout
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar */}
        <div className="w-56 bg-white shadow-lg flex flex-col py-8 px-4 gap-3 flex-shrink-0 overflow-y-auto sticky top-0 self-start h-[calc(100vh-64px)]">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Admin Panel</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition text-sm ${
                activeTab === "appointments" ? "bg-pink-500 text-white shadow" : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              📋 Appointments
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition text-sm ${
                activeTab === "payments" ? "bg-pink-500 text-white shadow" : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              💳 Payments
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition text-sm ${
                activeTab === "users" ? "bg-pink-500 text-white shadow" : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab("chart")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition text-sm ${
                activeTab === "chart" ? "bg-pink-500 text-white shadow" : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              📊 Sales Chart
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition text-sm ${
                activeTab === "reviews" ? "bg-pink-500 text-white shadow" : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              ⭐ Reviews
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h2>
          <p className="text-gray-600 mb-6">Manage all appointments, payments and users</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <p className="text-2xl font-bold text-pink-500">{stat.value}</p>
                <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Appointments Table */}
          {activeTab === "appointments" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-gray-800">All Appointments</h3>
                <input
                  placeholder="Search by name or service..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 bg-gray-50 w-full sm:w-64"
                />
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
                    ) : appointments.filter(a =>
                        !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase())
                      ).map((appt, i) => (
                      <tr key={appt.id} className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                        <td className="p-4 font-medium text-gray-800">{appt.name}</td>
                        <td className="p-4 text-gray-600">{appt.phone}</td>
                        <td className="p-4 text-gray-600">{appt.service}</td>
                        <td className="p-4 text-gray-600">
                        {appt.design && <p className="text-xs">{appt.design}</p>}
                        {appt.design_image && (
                          <img src={appt.design_image} alt="Design" className="mt-1 w-16 h-16 object-cover rounded-lg border border-pink-200" />
                        )}
                      </td>
                        <td className="p-4 text-gray-600">{appt.date} {appt.time}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appt.status === "Confirmed" ? "bg-green-100 text-green-600"
                            : appt.status === "Cancelled" ? "bg-red-100 text-red-500"
                            : appt.status === "Done" ? "bg-blue-100 text-blue-600"
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
                            {appt.status === "Confirmed" && (
                              <button onClick={() => updateStatus(appt.id, "Done")} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">
                                Done
                              </button>
                            )}
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
          )}

          {/* Payments Table */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Customer Payments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="text-left p-4 text-gray-700 font-semibold">Customer</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Service</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Amount</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Screenshot</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Date</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length === 0 ? (
                      <tr><td colSpan={7} className="p-8 text-center text-gray-500">No payments yet.</td></tr>
                    ) : payments.map((payment, i) => (
                      <tr key={payment.id} className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                        <td className="p-4 font-medium text-gray-800">{payment.customer_name || "—"}</td>
                        <td className="p-4 text-gray-600">{payment.service}</td>
                        <td className="p-4 text-gray-600 font-semibold text-pink-500">₱{payment.amount}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.payment_type === "full" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {payment.payment_type === "full" ? "Full" : "Half"}
                          </span>
                        </td>
                        <td className="p-4">
                          {payment.screenshot_url ? (
                            <a href={payment.screenshot_url} target="_blank" rel="noopener noreferrer">
                              <img src={payment.screenshot_url} alt="Payment screenshot" className="w-16 h-16 object-cover rounded-lg border-2 border-pink-200 hover:scale-105 transition cursor-pointer" />
                            </a>
                          ) : <span className="text-gray-400 text-xs">No screenshot</span>}
                        </td>
                        <td className="p-4 text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === "Verified" ? "bg-green-100 text-green-600"
                            : payment.status === "Rejected" ? "bg-red-100 text-red-500"
                            : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {payment.status === "Pending" && (
                            <div className="flex gap-2">
                              <button onClick={() => updatePaymentStatus(payment.id, "Verified")} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition">
                                Verify
                              </button>
                              <button onClick={() => updatePaymentStatus(payment.id, "Rejected")} className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition">
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Table */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">All Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="text-left p-4 text-gray-700 font-semibold">Username</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Email</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Role</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">No users yet.</td></tr>
                    ) : users.map((user, i) => (
                      <tr key={user.id} className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                        <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          {user.username}
                        </td>
                        <td className="p-4 text-gray-600">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sales Chart */}
          {activeTab === "chart" && (() => {
            const monthlyData = Array.from({ length: 12 }, (_, i) => {
              const month = new Date(0, i).toLocaleString("default", { month: "short" });
              const total = payments
                .filter((p) => new Date(p.created_at).getMonth() === i && p.status === "Verified")
                .reduce((sum, p) => sum + Number(p.amount), 0);
              return { month, total };
            });
            return (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">📊 Monthly Sales</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 13 }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} tickFormatter={(v) => `₱${v}`} />
                    <Tooltip formatter={(value: number) => [`₱${value}`, "Sales"]} />
                    <Bar dataKey="total" fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            );
          })()}

          {/* Reviews Table */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="text-left p-4 text-gray-700 font-semibold">Customer</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Rating</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Comment</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Date</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500">No reviews yet.</td></tr>
                    ) : reviews.map((review, i) => (
                      <tr key={review.id} className={i % 2 === 0 ? "bg-white" : "bg-pink-50/30"}>
                        <td className="p-4 font-medium text-gray-800">{review.name}</td>
                        <td className="p-4 text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</td>
                        <td className="p-4 text-gray-600 max-w-xs">{review.comment}</td>
                        <td className="p-4 text-gray-600">{new Date(review.created_at).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            review.status === "approved" ? "bg-green-100 text-green-600"
                            : review.status === "rejected" ? "bg-red-100 text-red-500"
                            : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {review.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {review.status === "pending" && (
                            <div className="flex gap-2">
                              <button onClick={() => updateReviewStatus(review.id, "approved")} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition">Approve</button>
                              <button onClick={() => updateReviewStatus(review.id, "rejected")} className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition">Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

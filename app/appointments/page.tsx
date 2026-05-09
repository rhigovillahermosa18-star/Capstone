"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  const [reviewAppt, setReviewAppt] = useState<Appointment | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

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
    router.push("/");
  };

  const handleReviewSubmit = async () => {
    if (!reviewComment.trim()) return;
    setReviewLoading(true);
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: reviewName || reviewAppt?.name, rating: reviewRating, comment: reviewComment }),
    });
    setReviewLoading(false);
    setReviewSubmitted(true);
    setTimeout(() => { setReviewAppt(null); setReviewSubmitted(false); setReviewComment(""); setReviewRating(5); }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">

      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Appointments" mode="auth" />

      {/* Content */}
      <div className="flex-grow px-6 py-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3">
              <span>📋</span> My Appointments
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Appointments</span></h2>
            <p className="text-gray-500 text-sm mt-1">View and manage your upcoming nail appointments</p>
          </div>

          {loading ? (
            <div className="grid gap-4">
              {[1,2,3].map(i => <div key={i} className="bg-white h-28 rounded-2xl shadow animate-pulse" />)}
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
              <p className="text-5xl mb-4">💅</p>
              <p className="text-gray-600 text-lg mb-6">You have no appointments yet.</p>
              <Link href="/book" className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white px-10 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300">
                Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-white p-5 rounded-2xl shadow-lg border border-pink-50 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-pink-100 to-pink-50 text-2xl w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">💅</div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-gray-800 text-base">{appt.name}</p>
                        <p className="text-pink-500 font-semibold text-sm">{appt.service}</p>
                        {appt.design && <p className="text-gray-400 text-xs">Design: {appt.design}</p>}
                        {appt.design_image && (
                          <img src={appt.design_image} alt="Design" className="mt-2 w-20 h-20 object-cover rounded-xl border-2 border-pink-100 shadow-sm" />
                        )}
                      </div>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">📅 Date</p>
                        <p className="font-semibold text-gray-700 mt-0.5">{appt.date}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">⏰ Time</p>
                        <p className="font-semibold text-gray-700 mt-0.5">{appt.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                        appt.status === "Confirmed" ? "bg-green-100 text-green-600"
                        : appt.status === "Cancelled" ? "bg-red-100 text-red-500"
                        : appt.status === "Done" ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {appt.status === "Confirmed" ? "✅" : appt.status === "Cancelled" ? "❌" : appt.status === "Done" ? "🎉" : "⏳"} {appt.status}
                      </span>
                      {appt.status === "Done" && (
                        <button
                          onClick={() => { setReviewAppt(appt); setReviewName(appt.name); }}
                          className="bg-yellow-400 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-500 transition shadow-sm"
                        >
                          ⭐ Review
                        </button>
                      )}
                      {appt.status !== "Cancelled" && appt.status !== "Done" && (
                        <div className="flex gap-2">
                          {!hasPaid(appt.id) && (
                            <Link
                              href={`/payment?service=${encodeURIComponent(appt.service)}&id=${appt.id}&name=${encodeURIComponent(appt.name)}`}
                              className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-pink-600 transition shadow-sm"
                            >
                              💳 Pay
                            </Link>
                          )}
                          {hasPaid(appt.id) ? (
                            <span className="bg-gray-100 text-gray-400 px-4 py-1.5 rounded-full text-xs font-semibold cursor-not-allowed" title="No refunds after payment">
                              🚫 No Refund
                            </span>
                          ) : (
                            <button
                              onClick={() => handleCancel(appt.id)}
                              className="bg-pink-50 text-pink-500 border border-pink-200 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-pink-100 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/book" className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white px-10 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300">
              + Book New Appointment
            </Link>
          </div>

        </div>
      </div>

      <Footer isLoggedIn={true} />

      {/* Review Modal */}
      {reviewAppt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-4">
            {reviewSubmitted ? (
              <div className="text-center py-6">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-xl font-bold text-gray-800">Thank you for your review!</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800">⭐ Leave a Review</h3>
                <p className="text-gray-500 text-sm">How was your experience with <span className="font-semibold text-pink-500">{reviewAppt.service}</span>?</p>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-600">Rating:</p>
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} onClick={() => setReviewRating(star)} className={`text-2xl transition ${star <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}>★</button>
                  ))}
                </div>
                <textarea
                  placeholder="Share your experience..."
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition resize-none"
                />
                <div className="flex gap-3">
                  <button onClick={handleReviewSubmit} disabled={reviewLoading} className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50">
                    {reviewLoading ? "Submitting..." : "Submit Review"}
                  </button>
                  <button onClick={() => setReviewAppt(null)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
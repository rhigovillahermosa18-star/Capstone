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
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Header + Navigation */}
      <div className="bg-[#FFD3DF] px-5 py-3 shadow-sm relative z-10 flex items-center justify-between gap-2">
        <Link href="/homepage" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={50} height={50} className="rounded-full border-2 border-white shadow" />
          <span className="text-black font-bold tracking-[0.2em] text-base hidden lg:block">MARVELOUSLY POLISHED</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <Link href="/homepage" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🏠 Home</Link>
          <Link href="/book" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📅 Book</Link>
          <Link href="/pricing" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">💰 Pricing</Link>
          <Link href="/gallery" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">🖼️ Gallery</Link>
          <Link href="/appointments" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">📋 Appointments</Link>
          <Link href="/reviews" className="bg-[#FFB6C9] px-3.5 py-2 rounded-full text-black text-sm hover:bg-pink-400 transition">⭐ Reviews</Link>
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
                      : appt.status === "Done" ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {appt.status}
                    </span>
                    {appt.status === "Done" && (
                      <button
                        onClick={() => { setReviewAppt(appt); setReviewName(appt.name); }}
                        className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition"
                      >
                        ⭐ Leave a Review
                      </button>
                    )}
                    {appt.status !== "Cancelled" && appt.status !== "Done" && (
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
              <h4 className="font-bold text-gray-800 text-lg text-center">Quick Links</h4>
              <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-sm">
                <Link href="/homepage" className="text-gray-700 hover:text-pink-600 transition">🏠 Home</Link>
                <Link href="/appointments" className="text-gray-700 hover:text-pink-600 transition">📋 Appointments</Link>
                <Link href="/book" className="text-gray-700 hover:text-pink-600 transition">📅 Book</Link>
                <Link href="/reviews" className="text-gray-700 hover:text-pink-600 transition">⭐ Reviews</Link>
                <Link href="/pricing" className="text-gray-700 hover:text-pink-600 transition">💰 Pricing</Link>
                <Link href="/payment" className="text-gray-700 hover:text-pink-600 transition">💳 Payment</Link>
                <Link href="/gallery" className="text-gray-700 hover:text-pink-600 transition">🖼️ Gallery</Link>
                <Link href="/settings" className="text-gray-700 hover:text-pink-600 transition">⚙️ Settings</Link>
              </div>
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
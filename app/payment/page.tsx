"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SERVICE_PRICES: Record<string, number> = {
  "Plain Set": 400,
  "Basic Set": 450,
  "Full Set": 600,
};

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "Basic Set";

  const totalAmount = SERVICE_PRICES[service] ?? 450;
  const halfAmount = totalAmount / 2;

  const [paymentType, setPaymentType] = useState<"half" | "full">("full");
  const [refNumber, setRefNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const amountToPay = paymentType === "half" ? halfAmount : totalAmount;

  const handleSubmit = async () => {
    if (!refNumber.trim()) {
      setError("Please enter your GCash reference number.");
      return;
    }
    setError("");
    setLoading(true);
    const user_id = localStorage.getItem("user_id");
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_id: searchParams.get("id") || null,
        user_id,
        service,
        amount: amountToPay,
        payment_type: paymentType,
        reference_number: refNumber,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border border-pink-100">
          <p className="text-5xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Submitted!</h2>
          <p className="text-gray-500 text-sm mb-1">Reference #: <span className="font-semibold text-pink-500">{refNumber}</span></p>
          <p className="text-gray-500 text-sm mb-6">Amount: <span className="font-semibold text-pink-500">₱{amountToPay}</span> ({paymentType === "half" ? "Half Payment" : "Full Payment"})</p>
          <p className="text-xs text-gray-400 mb-6">We will verify your payment shortly. Thank you!</p>
          <Link href="/appointments" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition">
            View My Appointments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl" />

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <Link href="/homepage" className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </Link>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10 flex-wrap">
        <Link href="/homepage" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">🏠 Home</Link>
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">Book Appointment</Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">Pricing</Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">Gallery</Link>
        <Link href="/appointments" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">My Appointments</Link>
      </div>

      {/* Payment Content */}
      <div className="flex-grow flex justify-center items-start px-6 py-12 relative z-10">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Payment</h2>
          <p className="text-center text-pink-400 text-sm mb-8">💳 Pay via GCash to confirm your appointment</p>

          <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 p-8 space-y-6">

            {/* Service Summary */}
            <div className="bg-pink-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-bold text-gray-800 text-lg">{service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-pink-500 text-2xl">₱{totalAmount}</p>
              </div>
            </div>

            {/* Payment Type */}
            <div>
              <p className="font-semibold text-gray-700 mb-3">Select Payment Option</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentType("half")}
                  className={`p-4 rounded-xl border-2 text-left transition ${paymentType === "half" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"}`}
                >
                  <p className="font-bold text-gray-800">Half Payment</p>
                  <p className="text-pink-500 text-xl font-bold mt-1">₱{halfAmount}</p>
                  <p className="text-xs text-gray-400 mt-1">Pay 50% now, rest on appointment day</p>
                </button>
                <button
                  onClick={() => setPaymentType("full")}
                  className={`p-4 rounded-xl border-2 text-left transition ${paymentType === "full" ? "border-pink-500 bg-pink-50" : "border-gray-200 hover:border-pink-300"}`}
                >
                  <p className="font-bold text-gray-800">Full Payment</p>
                  <p className="text-pink-500 text-xl font-bold mt-1">₱{totalAmount}</p>
                  <p className="text-xs text-gray-400 mt-1">Pay the full amount now</p>
                </button>
              </div>
            </div>

            {/* GCash QR */}
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-3">Scan GCash QR Code</p>
              <div className="inline-flex flex-col items-center bg-white border-4 border-pink-300 rounded-2xl p-4 shadow-lg">
                <div className="w-[200px] h-[200px] bg-pink-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-pink-200">
                  <p className="text-5xl">📱</p>
                  <p className="text-xs text-gray-400 mt-2 font-semibold">GCash QR Code</p>
                  <p className="text-xs text-gray-300 mt-1">Replace with your QR image</p>
                </div>
                {/* Once you have your QR image, replace the div above with:
                <Image src="/gcash-qr.png" alt="GCash QR" width={200} height={200} className="rounded-xl" /> */}
              </div>
              <p className="text-sm text-gray-500 mt-3">Send <span className="font-bold text-pink-500">₱{amountToPay}</span> to this GCash account</p>
              <p className="text-xs text-gray-400 mt-1">Account Name: <span className="font-semibold text-gray-600">Marvelously Polished</span></p>
              <p className="text-xs text-gray-400">Number: <span className="font-semibold text-gray-600">09XX-XXX-XXXX</span></p>
            </div>

            {/* Reference Number */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">Enter GCash Reference Number</p>
              <input
                placeholder="e.g. 1234567890"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
              />
              <p className="text-xs text-gray-400 mt-1">Found in your GCash transaction history</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : `Confirm Payment — ₱${amountToPay}`}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Your appointment will be confirmed once payment is verified by our team.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-[#FFD3DF] relative z-10 pt-6 pb-6 px-6">
        <div className="max-w-6xl mx-auto border-t border-pink-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-700">
          <p>© 2026 Marvelously Polished. All rights reserved.</p>
          <p>Santa Ana | Book Your Glam Today 💅</p>
        </div>
      </footer>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center"><p className="text-pink-500">Loading...</p></div>}>
      <PaymentContent />
    </Suspense>
  );
}

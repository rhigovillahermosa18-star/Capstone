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
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const amountToPay = paymentType === "half" ? halfAmount : totalAmount;

  const handleSubmit = async () => {
    if (!screenshotFile) {
      setError("Please upload a screenshot of your payment.");
      return;
    }
    setError("");
    setLoading(true);

    let screenshotUrl = "";
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );
    const fileExt = screenshotFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("designs")
      .upload(fileName, screenshotFile, { upsert: true });
    if (uploadError) {
      setError(`Failed to upload screenshot: ${uploadError.message}`);
      setLoading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("designs").getPublicUrl(fileName);
    screenshotUrl = urlData.publicUrl;

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
        screenshot_url: screenshotUrl,
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
        <Link href="/payment" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">💳 Payment</Link>
        <button
          onClick={async () => { await fetch("/api/logout", { method: "POST" }); localStorage.removeItem("role"); localStorage.removeItem("user_id"); router.push("/login"); }}
          className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </button>
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
                <Image src="/qrcode.jpg" alt="GCash QR" width={200} height={200} className="rounded-xl" />
              </div>
              <p className="text-sm text-gray-500 mt-3">Send <span className="font-bold text-pink-500">₱{amountToPay}</span> to this GCash account</p>
              <p className="text-xs text-gray-400 mt-1">Account Name: <span className="font-semibold text-gray-600">Marvelous Felaine Villahermosa</span></p>
              <p className="text-xs text-gray-400">Number: <span className="font-semibold text-gray-600">0906-445-5283</span></p>
            </div>

            {/* Screenshot Upload */}
            <div>
              <p className="font-semibold text-gray-700 mb-2">Upload Payment Screenshot</p>
              <div className="border-2 border-dashed border-pink-300 rounded-xl p-5 bg-pink-50">
                <p className="text-gray-500 text-sm mb-3">Take a screenshot of your GCash payment confirmation and upload it here (PNG, JPG)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setScreenshotFile(file);
                    if (file) setScreenshotPreview(URL.createObjectURL(file));
                    else setScreenshotPreview("");
                  }}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-400 file:text-white hover:file:bg-pink-500 cursor-pointer"
                />
                {screenshotPreview && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img src={screenshotPreview} alt="Payment screenshot" className="w-full h-48 object-cover rounded-xl" />
                  </div>
                )}
              </div>
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
                <Link href="/payment" className="block text-gray-700 hover:text-pink-600 transition">Payment</Link>
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

export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center"><p className="text-pink-500">Loading...</p></div>}>
      <PaymentContent />
    </Suspense>
  );
}

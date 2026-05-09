"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICE_PRICES: Record<string, Record<string, number>> = {
  "Plain Set": { "Short": 400, "Medium": 450, "Long": 500 },
  "Basic Set": { "Short": 450, "Medium": 500, "Long": 550 },
  "Full Set":  { "Short": 600, "Medium": 650, "Long": 700 },
};

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "Basic Set";
  const nailSize = searchParams.get("nail_size") || "Short";
  const nameFromUrl = searchParams.get("name") || "";

  const totalAmount = SERVICE_PRICES[service]?.[nailSize] ?? SERVICE_PRICES[service]?.["Short"] ?? 450;
  const halfAmount = totalAmount / 2;

  const [paymentType, setPaymentType] = useState<"half" | "full">("full");
  const [customerName, setCustomerName] = useState(nameFromUrl);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const amountToPay = paymentType === "half" ? halfAmount : totalAmount;

  const handleSubmit = async () => {
    if (!screenshotFile || !customerName.trim()) {
      setError(!customerName.trim() ? "Please enter your name." : "Please upload a screenshot of your payment.");
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
        customer_name: customerName,
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
      <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-pink-100">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Payment Submitted!</h2>
          <p className="text-gray-500 text-sm mb-1">Amount: <span className="font-semibold text-pink-500">₱{amountToPay}</span></p>
          <p className="text-gray-400 text-xs mb-6">({paymentType === "half" ? "Half Payment" : "Full Payment"}) — We will verify shortly. Thank you!</p>
          <Link href="/appointments" className="inline-block bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300">
            View My Appointments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <Navbar active="Payment" mode="auth" />

      {/* Payment Content */}
      <div className="flex-grow flex justify-center items-start px-6 py-8 relative z-10">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3">
              <span>💳</span> GCash Payment
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400">Payment</span></h1>
            <p className="text-gray-500 text-sm mt-1">Scan the QR code and upload your payment screenshot</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* Left - QR Code */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-pink-100 p-6 flex flex-col items-center text-center space-y-3">
                <p className="font-semibold text-gray-700">Scan GCash QR Code</p>
                <div className="inline-flex flex-col items-center bg-white border-4 border-pink-200 rounded-2xl p-3 shadow-md">
                  <Image src="/qrcode.jpg" alt="GCash QR" width={220} height={220} className="rounded-xl" />
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 w-full border border-pink-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Service</p>
                  <p className="font-bold text-gray-800 text-base">{service} · {nailSize}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mt-2">Amount to Pay</p>
                  <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400 text-4xl">₱{amountToPay}</p>
                  <p className="text-xs text-gray-400 mt-1">({paymentType === "half" ? "Half Payment" : "Full Payment"})</p>
                </div>
                <p className="text-xs text-gray-400">Account: <span className="font-semibold text-gray-600">Marvelous Felaine Villahermosa</span></p>
                <p className="text-xs text-gray-400">Number: <span className="font-semibold text-gray-600">0906-445-5283</span></p>
              </div>
            </div>

            {/* Right - Payment Details */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-pink-100 p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Payment Option</p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setPaymentType("half")} className={`p-4 rounded-2xl border-2 text-left transition ${paymentType === "half" ? "border-pink-500 bg-pink-50 shadow-sm" : "border-gray-200 hover:border-pink-200"}`}>
                    <p className="font-bold text-gray-800 text-sm">Half Payment</p>
                    <p className="text-pink-500 text-xl font-extrabold mt-1">₱{halfAmount}</p>
                    <p className="text-xs text-gray-400 mt-1">Pay 50% now</p>
                  </button>
                  <button onClick={() => setPaymentType("full")} className={`p-4 rounded-2xl border-2 text-left transition ${paymentType === "full" ? "border-pink-500 bg-pink-50 shadow-sm" : "border-gray-200 hover:border-pink-200"}`}>
                    <p className="font-bold text-gray-800 text-sm">Full Payment</p>
                    <p className="text-pink-500 text-xl font-extrabold mt-1">₱{totalAmount}</p>
                    <p className="text-xs text-gray-400 mt-1">Pay full amount</p>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your Name</p>
                <input placeholder="Enter your full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Upload Payment Screenshot</p>
                <div className="border-2 border-dashed border-pink-200 rounded-2xl p-4 bg-pink-50/50">
                  <p className="text-gray-400 text-xs mb-3">Take a screenshot of your GCash confirmation and upload it here</p>
                  <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0] || null; setScreenshotFile(file); if (file) setScreenshotPreview(URL.createObjectURL(file)); else setScreenshotPreview(""); }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-pink-400 file:text-white hover:file:shadow-md cursor-pointer" />
                  {screenshotPreview && (
                    <div className="mt-3">
                      <img src={screenshotPreview} alt="Payment screenshot" className="w-full h-44 object-cover rounded-xl shadow-sm" />
                    </div>
                  )}
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{error}</div>}

              <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {loading ? "Submitting..." : `Confirm Payment — ₱${amountToPay}`}
              </button>
              <p className="text-xs text-gray-400 text-center">Your appointment will be confirmed once payment is verified.</p>
            </div>

          </div>
        </div>
      </div>

      <Footer isLoggedIn={true} />
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex items-center justify-center"><p className="text-pink-500 font-medium">Loading...</p></div>}>
      <PaymentContent />
    </Suspense>
  );
}

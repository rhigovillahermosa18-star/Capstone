"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) { setError("Please enter your email."); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    setUserId(data.userId);
    setStep(2);
  };

  const handleVerifyCode = async () => {
    if (!code) { setError("Please enter the code."); return; }
    if (code.length !== 6) { setError("Code must be 6 digits."); return; }
    setError("");
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) { setError("Please fill in all fields."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/forgot-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, code, newPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Something went wrong."); return; }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left - Branding */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-6">
            <Image src="/logo1.png" alt="Logo" width={300} height={300} className="rounded-full shadow-2xl border-4 border-white" />
            <h1 className="text-4xl font-bold text-gray-800">MARVELOUSLY POLISHED</h1>
            <p className="text-xl text-pink-600 font-medium">Beauty Starts From Tips to Toes 💅</p>
          </div>

          {/* Right - Form */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= s ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-400"}`}>{s}</div>
              ))}
            </div>

            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Forgot Password</h2>
                  <p className="text-gray-500 text-sm">Enter your email to receive a reset code</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button onClick={handleSendCode} disabled={loading} className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50">
                    {loading ? "Sending..." : "Send Reset Code"}
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Enter Code</h2>
                  <p className="text-gray-500 text-sm">We sent a 6-digit code to <span className="text-pink-500 font-medium">{email}</span></p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reset Code</label>
                    <input type="text" placeholder="Enter 6-digit code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black text-center text-2xl tracking-widest focus:outline-none focus:border-pink-400 transition" />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button onClick={handleVerifyCode} disabled={loading} className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50">
                    Verify Code
                  </button>
                  <button onClick={() => { setStep(1); setCode(""); setError(""); }} className="w-full text-gray-500 text-sm hover:text-pink-500 transition">
                    ← Back
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">New Password</h2>
                  <p className="text-gray-500 text-sm">Set your new password</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input type={showNew ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">{showNew ? "🙈" : "👁️"}</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input type={showConfirm ? "text" : "password"} placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition" />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500">{showConfirm ? "🙈" : "👁️"}</button>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button onClick={handleResetPassword} disabled={loading} className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition disabled:opacity-50">
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <Link href="/login" className="text-gray-500 text-sm hover:text-pink-500 transition">← Back to Login</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

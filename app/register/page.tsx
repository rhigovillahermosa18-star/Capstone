"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, phone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }

    setSuccess("Verification code sent to your email!");
    setUserId(data.userId);
    setLoading(false);
    setStep("verify");
  };

  const handleVerify = async () => {
    if (!code.trim()) { setVerifyError("Please enter the verification code."); return; }
    setVerifyLoading(true);
    setVerifyError("");
    const res = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, code }),
    });
    const data = await res.json();
    if (!res.ok) { setVerifyError(data.error || "Invalid code."); setVerifyLoading(false); return; }
    setVerifyLoading(false);
    router.push("/login?verified=true");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EF] to-[#FFD3DF] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-60px] left-[-100px] w-96 h-96 bg-pink-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full blur-xl opacity-30 scale-110" />
              <Image src="/logo1.png" alt="Logo" width={220} height={220} className="relative rounded-full shadow-2xl border-4 border-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">MARVELOUSLY POLISHED</h1>
            <p className="text-pink-500 font-semibold text-lg">Beauty Starts From Tips to Toes 💅</p>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p className="flex items-center gap-2 justify-center"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span> Premium nail care services</p>
              <p className="flex items-center gap-2 justify-center"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span> Exclusive member benefits</p>
              <p className="flex items-center gap-2 justify-center"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span> Easy online booking</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-pink-100">

            {step === "verify" ? (
              <div className="text-center space-y-5">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white text-3xl">📧</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-800">Check Your Email</h2>
                <p className="text-gray-400 text-sm">We sent a 6-digit code to <span className="font-semibold text-pink-500">{email}</span></p>
                <input type="text" maxLength={6} placeholder="000000" value={code} onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-800 text-center text-3xl tracking-[0.5em] font-bold focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
                {verifyError && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{verifyError}</div>}
                <button onClick={handleVerify} disabled={verifyLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                  {verifyLoading ? "Verifying..." : "Verify Email"}
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">✨</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
                  <p className="text-gray-400 text-sm mt-1">Join us for exclusive beauty experiences</p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Full Name", type: "text", placeholder: "Enter your full name", value: username, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) },
                    { label: "Phone Number", type: "tel", placeholder: "Enter your phone number", value: phone, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value) },
                    { label: "Email", type: "email", placeholder: "Enter your email", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={f.value} onChange={f.onChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
                    </div>
                  ))}

                  {[{label:"Password",show:showPassword,toggle:()=>setShowPassword(!showPassword),val:password,set:(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),ph:"Create a password (min 6 chars)"},{label:"Confirm Password",show:showConfirm,toggle:()=>setShowConfirm(!showConfirm),val:confirmPassword,set:(e:React.ChangeEvent<HTMLInputElement>)=>setConfirmPassword(e.target.value),ph:"Confirm your password"}].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
                      <div className="relative">
                        <input type={f.show ? "text" : "password"} placeholder={f.ph} value={f.val} onChange={f.set}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
                        <button type="button" onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition text-sm">{f.show ? "🙈" : "👁️"}</button>
                      </div>
                    </div>
                  ))}

                  {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{error}</div>}
                  {success && <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2.5 rounded-xl">{success}</div>}

                  <button onClick={handleRegister} disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>

                <div className="mt-5 text-center">
                  <p className="text-gray-400 text-sm">Already have an account?{" "}
                    <Link href="/login" className="text-pink-500 font-semibold hover:text-pink-600">Sign In</Link>
                  </p>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

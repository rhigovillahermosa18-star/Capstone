"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (searchParams.get("verified") === "true") setVerified(true);
  }, [searchParams]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("role", data.role);
      if (data.user) localStorage.setItem("user_id", data.user.id);

      data.role === "admin" ? router.replace("/admin") : router.replace("/homepage");
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
              <p className="flex items-center gap-2 justify-center"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span> Easy online booking</p>
              <p className="flex items-center gap-2 justify-center"><span className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 text-xs">✓</span> Trusted by hundreds of clients</p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-pink-100">
            <div className="mb-3">
              <Link href="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-pink-500 transition text-sm">← Back to Home</Link>
            </div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">💅</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800">Welcome Back</h2>
              <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition bg-gray-50" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition text-sm">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {verified && (
                <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <span>✅</span> Your email has been verified! You can now sign in.
                </div>
              )}
              {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-xl">{error}</div>}

              <button onClick={handleLogin} disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-pink-500 font-semibold hover:text-pink-600">Sign Up</Link>
              </p>
              <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-pink-500 transition">Forgot your password?</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

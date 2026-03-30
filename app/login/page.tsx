"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");

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
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-6">
            <Image src="/logo1.png" alt="Marvelously Polished Logo" width={300} height={300} className="rounded-full shadow-2xl border-4 border-white" />
            <h1 className="text-4xl font-bold text-gray-800">MARVELOUSLY POLISHED</h1>
            <p className="text-xl text-pink-600 font-medium">Beauty Starts From Tips to Toes 💅</p>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login to your account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-pink-500 font-semibold hover:text-pink-600">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

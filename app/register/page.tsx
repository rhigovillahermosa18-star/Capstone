"use client";

import Link from "next/link";

export default function Register() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#e8c1cc]"
      style={{
        backgroundImage: "url('/logo1.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "500px",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
        <h2 className="text-xl text-black font-semibold mb-4">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded text-black placeholder:text-black"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded text-black placeholder:text-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded text-black placeholder:text-black"
        />

        <button className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition">
          Sign Up
        </button>

        <p className="mt-4 text-black">
          Already have account?{" "}
          <Link href="/login" className="text-pink-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
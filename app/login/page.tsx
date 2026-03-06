"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/homepage");
  };

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
        <h2 className="text-black text-xl font-semibold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded text-black placeholder:text-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded text-black placeholder:text-black"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-black">
          Don't have account?{" "}
          <Link href="/register" className="text-pink-500">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-6">
            <Image
              src="/logo1.png"
              alt="Marvelously Polished Logo"
              width={300}
              height={300}
              className="rounded-full shadow-2xl border-4 border-white"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              MARVELOUSLY POLISHED
            </h1>
            <p className="text-xl text-pink-600 font-medium">
              Beauty Starts From Tips to Toes 💅
            </p>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2 justify-center">
                <span className="text-pink-500">✓</span>
                Professional Nail Artists
              </p>
              <p className="flex items-center gap-2 justify-center">
                <span className="text-pink-500">✓</span>
                Premium Products
              </p>
              <p className="flex items-center gap-2 justify-center">
                <span className="text-pink-500">✓</span>
                Exclusive Member Benefits
              </p>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join us for exclusive beauty experiences</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:border-pink-400 transition"
                />
              </div>

              <div className="flex items-start text-sm">
                <input type="checkbox" className="mr-2 mt-1" />
                <label className="text-gray-600">
                  I agree to the <Link href="#" className="text-pink-500 hover:text-pink-600">Terms & Conditions</Link> and <Link href="#" className="text-pink-500 hover:text-pink-600">Privacy Policy</Link>
                </label>
              </div>

              <button className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300">
                Create Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-pink-500 font-semibold hover:text-pink-600">
                  Login
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
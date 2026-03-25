"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center shadow-sm relative z-10">
        <h1 className="text-3xl tracking-widest font-semibold text-black">
          MARVELOUSLY POLISHED
        </h1>
      </div>

      {/* Navigation */}
      <div className="py-4 flex justify-center gap-4 relative z-10 flex-wrap">
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Book Appointment
        </Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Pricing
        </Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          Gallery
        </Link>
        <Link href="/appointments" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition">
          My Appointments
        </Link>
        <button
          onClick={handleLogout}
          className="bg-gray-200 px-5 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-center lg:text-left space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Marvelously<br/>Polished
            </h2>
            <p className="text-2xl text-pink-600 font-medium">
              Beauty Starts From Tips to Toes 💅
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Experience luxury nail care in Santa Ana. Our artists use premium products to create stunning designs that express your unique style.
            </p>
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start pt-4">
              <Link href="/book" className="bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300">
                Book Now
              </Link>
              <Link href="/gallery" className="bg-white text-pink-600 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-300">
                View Gallery
              </Link>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start pt-6 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">✓</span>
                <span>Premium Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">✓</span>
                <span>Santa Ana</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Image src="/logo1.png" alt="Marvelously Polished Logo" width={400} height={400} className="rounded-full shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-300" />
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <Image src="/nail1.jpg" width={200} height={200} alt="Nail Design" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover" />
              <Image src="/nail2.jpg" width={200} height={200} alt="Nail Design" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover" />
              <Image src="/nail3.jpg" width={200} height={200} alt="Nail Design" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover" />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
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

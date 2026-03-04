import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-pink-300 flex flex-col items-center justify-center text-center">

      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logo1.png"  // put your logo in public folder
          alt="Marvelously Polished Logo"
          width={220}
          height={220}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold tracking-wide text-gray-800">
        MARVELOUSLY POLISHED
      </h1>

      <p className="mt-3 text-gray-700 italic">
        Beauty Starts From Tips to Toes 💅
      </p>

      {/* Get Started Button */}
      <Link
        href="/login"
        className="mt-8 bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition duration-300"
      >
        Get Started
      </Link>

    </div>
  );
}
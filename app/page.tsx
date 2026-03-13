import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-[-120px] w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 right-[-120px] w-80 h-80 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-2xl"></div>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10">
        
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Image
            src="/logo12.png"
            alt="Marvelously Polished Logo"
            width={280}
            height={280}
            className="rounded-full shadow-2xl border-4 border-white"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-widest text-gray-800 mb-4">
          MARVELOUSLY POLISHED
        </h1>

        <p className="text-xl text-gray-700 mb-8 font-light">
          Beauty Starts From Tips to Toes 💅
        </p>

        <p className="text-gray-600 max-w-md mb-10">
          Experience luxury nail care in Santa Ana. Professional artists, premium products, and stunning designs await you.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/book"
            className="bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300"
          >
            Book Now
          </Link>
          
          <Link
            href="/gallery"
            className="bg-white text-pink-600 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-200"
          >
            View Gallery
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-[#FFD3DF] text-center py-6 relative z-10">
        <p className="text-black font-medium">
          © 2026 Marvelously Polished
        </p>
        <p className="text-sm text-black mt-1">
          Santa Ana | Book Your Glam Today 💅
        </p>
      </footer>

    </div>
  );
}
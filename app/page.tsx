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
      <div className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-gray-800 leading-tight">
              MARVELOUSLY<br/>POLISHED
            </h1>

            <p className="text-2xl text-pink-600 font-medium">
              Beauty Starts From Tips to Toes 💅
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Experience luxury nail care in Santa Ana. Our professional artists use premium products to create stunning designs that express your unique style.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap justify-center lg:justify-start pt-4">
              <Link
                href="/book"
                className="bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </Link>
              
              <Link
                href="/gallery"
                className="bg-white text-pink-600 px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-pink-300"
              >
                View Gallery
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex gap-8 justify-center lg:justify-start pt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">✓</span>
                <span>Professional Artists</span>
              </div>
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

          {/* Right Content - Logo & Images */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Image
                src="/logo12.png"
                alt="Marvelously Polished Logo"
                width={320}
                height={320}
                className="rounded-full shadow-2xl border-4 border-white"
              />
            </div>

            {/* Featured Nail Designs */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <Image
                src="/nail1.jpg"
                width={200}
                height={200}
                alt="Nail Design"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover"
              />
              <Image
                src="/nail2.jpg"
                width={200}
                height={200}
                alt="Nail Design"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover"
              />
              <Image
                src="/nail3.jpg"
                width={200}
                height={200}
                alt="Nail Design"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full h-24 object-cover"
              />
            </div>
          </div>

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
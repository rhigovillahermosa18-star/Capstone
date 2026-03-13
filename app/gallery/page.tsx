import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col relative overflow-hidden">

      {/* Decorative Shapes */}
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
      <div className="py-4 flex justify-center gap-4 relative z-10">
        <Link
          href="/book"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Book Appointment
        </Link>

        <Link
          href="/pricing"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Pricing
        </Link>

        <Link
          href="/gallery"
          className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black hover:bg-pink-400 transition"
        >
          Gallery
        </Link>
      </div>

      {/* Gallery Content */}
      <div className="flex flex-grow justify-center items-center relative z-10">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg">

          <h2 className="text-center font-bold mb-6 text-black text-2xl">
            Gallery 💅
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <Image
              src="/nail1.jpg"
              width={200}
              height={200}
              alt="Nail design"
              className="rounded-lg hover:scale-105 transition"
            />

            <Image
              src="/nail2.jpg"
              width={200}
              height={200}
              alt="Nail design"
              className="rounded-lg hover:scale-105 transition"
            />

            <Image
              src="/nail3.jpg"
              width={200}
              height={200}
              alt="Nail design"
              className="rounded-lg hover:scale-105 transition"
            />

          </div>

        </div>
      </div>

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
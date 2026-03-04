import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col">

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center">
        <h1 className="text-3xl tracking-widest font-medium text-black">
          MARVELOUSLY POLISHED
        </h1>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <Link href="/book" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Book Appointment
        </Link>
        <Link href="/pricing" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Pricing
        </Link>
        <Link href="/gallery" className="bg-[#FFB6C9] px-5 py-2 rounded-full text-black">
          Gallery
        </Link>
      </div>

      {/* Main */}
      <div className="flex flex-col items-center justify-center py-16 text-center flex-grow">
        <Image
          src="/logo1.png"
          alt="Logo"
          width={400}
          height={400}
        />

        <h2 className="text-3xl text-black mt-6 font-semibold">
          Marvelously Polished
        </h2>
        <p className="italic text-xl mt-2 text-black">
          Beauty Starts From Tips to Toes
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFD3DF] text-center py-6 mt-10">
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
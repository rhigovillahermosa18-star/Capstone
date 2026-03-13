import Link from "next/link";

export default function Pricing() {
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

      {/* Pricing Content */}
      <div className="flex flex-grow justify-center items-center relative z-10">
        <div className="bg-white p-10 rounded-xl w-full max-w-md shadow-xl text-center">

          <h2 className="text-2xl font-bold mb-6 text-black">
            Pricing 💅
          </h2>

          <div className="mb-6 text-black border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Plain Set</h3>
            <p>Short — ₱400</p>
            <p>Medium — ₱450</p>
            <p>Long — ₱500</p>
          </div>

          <div className="text-black">
            <h3 className="font-bold text-lg mb-2">Basic Set</h3>
            <p>Short — ₱450</p>
            <p>Medium — ₱500</p>
            <p>Long — ₱550</p>
          </div>

        </div>
      </div>

    </div>
  );
}
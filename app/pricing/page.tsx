import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#FFE4EF] flex flex-col">

      {/* Header */}
      <div className="bg-[#FFD3DF] py-6 text-center">
        <h1 className="text-3xl tracking-widest font-medium text-black">
          MARVELOUSLY POLISHED
        </h1>
      </div>

      {/* Navigation */}
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

      {/* Pricing Content */}
      <div className="flex flex-grow justify-center items-center">
        <div className="bg-white p-8 rounded-xl w-80 shadow-md text-center">

          <h2 className="text-xl font-semibold mb-4 text-black">
            Pricing
          </h2>

          <div className="mb-4 text-black">
            <h3 className="font-bold">Plain Set</h3>
            <p>Short - 400</p>
            <p>Medium - 450</p>
            <p>Long - 500</p>
          </div>

          <div className="text-black">
            <h3 className="font-bold">Basic Set</h3>
            <p>Short - 450</p>
            <p>Medium - 500</p>
            <p>Long - 550</p>
          </div>

        </div>
      </div>

    </div>
  );
}
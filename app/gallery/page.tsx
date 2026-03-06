import Link from "next/link";
import Image from "next/image";

export default function Gallery() {
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

      {/* Gallery Content */}
      <div className="flex flex-grow justify-center items-center">
        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-center font-semibold mb-6 text-black text-xl">
            Gallery 💅
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <Image
              src="/nail1.jpg"
              width={120}
              height={120}
              alt="Nail design"
              className="rounded-lg"
            />

            <Image
              src="/nail2.jpg"
              width={120}
              height={120}
              alt="Nail design"
              className="rounded-lg"
            />

            <Image
              src="/nail3.jpg"
              width={120}
              height={120}
              alt="Nail design"
              className="rounded-lg"
            />
          </div>

        </div>
      </div>

    </div>
  );
}
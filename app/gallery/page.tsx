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
      <div className="flex-grow relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center font-bold mb-12 text-black text-4xl tracking-wide">
            Our Work 💅
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail1.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail2.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail3.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail4.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail5.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src="/nail6.jpg"
                width={400}
                height={400}
                alt="Nail design"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

          </div>

        </div>
      </div>

    <footer className="bg-[#FFD3DF] relative z-10 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-3 gap-8 mb-10">

            {/* Brand */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Premium nail care in Santa Ana. Where beauty meets artistry.
              </p>
              <p className="text-pink-600 font-medium text-sm">Beauty Starts From Tips to Toes 💅</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-lg">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/homepage" className="block text-gray-700 hover:text-pink-600 transition">Home</Link>
                <Link href="/book" className="block text-gray-700 hover:text-pink-600 transition">Book Appointment</Link>
                <Link href="/pricing" className="block text-gray-700 hover:text-pink-600 transition">Pricing</Link>
                <Link href="/gallery" className="block text-gray-700 hover:text-pink-600 transition">Gallery</Link>
              </div>
            </div>

            {/* Contact */}
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
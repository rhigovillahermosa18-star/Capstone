"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Star, Gem, Flower2, Sparkles, Heart } from "lucide-react";

type Props = {
  isLoggedIn?: boolean | null;
};

const publicLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/pricing", label: "Pricing", icon: "💰" },
  { href: "/gallery", label: "Gallery", icon: "🖼️" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/about", label: "About Us", icon: "💖" },
];

const authLinks = [
  { href: "/homepage", label: "Home", icon: "🏠" },
  { href: "/book", label: "Book", icon: "📅" },
  { href: "/appointments", label: "Appointments", icon: "📋" },
  { href: "/pricing", label: "Pricing", icon: "💰" },
  { href: "/gallery", label: "Gallery", icon: "🖼️" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/payment", label: "Payment", icon: "💳" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Footer({ isLoggedIn }: Props) {
  const links = isLoggedIn ? authLinks : publicLinks;

  return (
    <footer className="bg-gradient-to-b from-[#FFD3DF] to-[#FFB6C9] relative z-10 pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-8">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/logo1.png" alt="Logo" width={44} height={44} className="rounded-full border-2 border-white shadow" />
              <h3 className="text-base font-bold text-gray-800 tracking-widest">MARVELOUSLY POLISHED</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">A premium nail salon in Ylaya, Barili, Cebu. We craft stunning nail designs with love, precision, and top-quality products.</p>
            <p className="text-pink-600 font-semibold text-sm italic">&ldquo;Beauty Starts From Tips to Toes 💅&rdquo;</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-base border-b border-pink-300 pb-1">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="flex items-center text-gray-700 hover:text-pink-600 transition">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-base border-b border-pink-300 pb-1">Contact Us</h4>
            <div className="space-y-2.5 text-sm text-gray-700">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-pink-500 flex-shrink-0" /> Ylaya, Barili, Cebu</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-pink-500 flex-shrink-0" /> 09064455283</p>
              <a href="https://www.instagram.com/marvelously.polished" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                marvelously.polished
              </a>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-pink-500 flex-shrink-0" /> Mon–Sat: 9AM – 7PM</p>
            </div>
          </div>

          {/* About the Salon */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-base border-b border-pink-300 pb-1">About the Salon</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2"><Star className="w-4 h-4 text-pink-500 flex-shrink-0" /> Expert nail artists with years of experience</p>
              <p className="flex items-center gap-2"><Gem className="w-4 h-4 text-pink-500 flex-shrink-0" /> Premium gel & acrylic products</p>
              <p className="flex items-center gap-2"><Flower2 className="w-4 h-4 text-pink-500 flex-shrink-0" /> Clean, relaxing salon environment</p>
              <p className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" /> Custom designs tailored just for you</p>
              <p className="flex items-center gap-2"><Heart className="w-4 h-4 text-pink-500 flex-shrink-0" /> Trusted by hundreds of happy clients</p>
            </div>
          </div>

        </div>

        <div className="border-t border-pink-300 pt-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© 2026 Marvelously Polished. All rights reserved.</p>
          <p>Ylaya, Barili, Cebu | Book Your Glam Today 💅</p>
        </div>
      </div>
    </footer>
  );
}

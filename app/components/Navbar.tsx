"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  active?: string;
  mode?: "public" | "auth" | "auto";
};

const publicMain = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
];

const publicMore = [
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About Us" },
];

const authMain = [
  { href: "/homepage", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/appointments", label: "Appointments" },
];

const authMore = [
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/payment", label: "Payment" },
  { href: "/about", label: "About Us" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar({ active, mode = "auto" }: Props) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "public") { setIsLoggedIn(false); return; }
    if (mode === "auth") { setIsLoggedIn(true); return; }
    setIsLoggedIn(!!localStorage.getItem("user_id"));
  }, [mode]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    router.push("/");
  };

  const mainLinks = isLoggedIn ? authMain : publicMain;
  const moreLinks = isLoggedIn ? authMore : publicMore;
  const allLinks = [...mainLinks, ...moreLinks];

  const nl = "px-3.5 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200";
  const al = "px-3.5 py-1.5 rounded-full text-sm font-semibold bg-pink-500 text-white shadow-sm";

  const isMoreActive = moreLinks.some(l => l.label === active);

  return (
    <nav className="bg-white/90 backdrop-blur-md px-5 py-3 shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href={isLoggedIn ? "/homepage" : "/"} className="flex items-center gap-2.5 flex-shrink-0">
          <Image src="/logo1.png" alt="Logo" width={40} height={40} className="rounded-full border-2 border-pink-200 shadow" />
          <span className="text-pink-700 font-extrabold tracking-widest text-xs hidden sm:block">MARVELOUSLY POLISHED</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {isLoggedIn === null ? (
            <div className="h-7 w-48 bg-pink-100 rounded-full animate-pulse" />
          ) : (
            <>
              {mainLinks.map(l => (
                <Link key={l.href} href={l.href} className={active === l.label ? al : nl}>
                  {l.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isMoreActive ? "bg-pink-500 text-white shadow-sm" : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  More
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 min-w-[160px] z-50">
                    {moreLinks.map(l => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                          active === l.label ? "text-pink-600 bg-pink-50" : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isLoggedIn === false && (
            <>
              <Link href="/login" className="hidden sm:inline-flex border border-pink-300 text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-pink-50 transition">Log In</Link>
              <Link href="/register" className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all">Sign Up</Link>
            </>
          )}
          {isLoggedIn === true && (
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 rounded-xl hover:bg-pink-50 transition items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-pink-500 rounded transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-pink-500 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-pink-500 rounded transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pb-2 border-t border-pink-100 pt-3 flex flex-col gap-1">
          {isLoggedIn !== null && allLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${active === l.label ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 px-1">
            {isLoggedIn === false && (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border border-pink-300 text-pink-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-pink-50 transition">Log In</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2.5 rounded-xl text-sm font-semibold shadow transition">Sign Up</Link>
              </>
            )}
            {isLoggedIn === true && (
              <button onClick={handleLogout} className="flex-1 border border-red-200 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

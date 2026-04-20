"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white border-none cursor-pointer flex items-center justify-center z-50 shadow-[0_4px_16px_rgba(56,189,248,0.3)] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      } hover:shadow-[0_8px_24px_rgba(56,189,248,0.5)] hover:-translate-y-0.5`}
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

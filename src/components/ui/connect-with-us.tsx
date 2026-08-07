"use client";

import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/hooks/useLanguage";

export const HeroSocialConnect = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4 relative">
      {/* Soft Ambient Background Glow behind container */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/10 blur-2xl rounded-full pointer-events-none -z-10" />

      {/* Sheer Glassmorphism Container that blends into Hero Canvas */}
      <div
        className="rounded-2xl sm:rounded-full bg-[var(--color-canvas-elevated)]/40 backdrop-blur-xl border border-[var(--color-hairline)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden p-4 sm:py-4 sm:px-7 transition-all duration-500 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-canvas-elevated)]/60"
      >
        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7">
          {/* Primary Action: Contact Me */}
          <button
            onClick={scrollToContact}
            className="hero-social-item contact-item group flex flex-col items-center cursor-pointer border-none bg-transparent active:scale-95 touch-manipulation"
          >
            <div className="hero-icon-container bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30 group-hover:shadow-[var(--color-primary)]/60 group-hover:scale-110 group-hover:-translate-y-1.5">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="hero-icon-label group-hover:opacity-100 group-hover:text-white">
              {t({ id: "Kontak", en: "Contact Me" })}
            </span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/ferdiansyach"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-item github group flex flex-col items-center text-decoration-none active:scale-95 touch-manipulation"
            aria-label="GitHub Profile"
          >
            <div className="hero-icon-container group-hover:scale-110 group-hover:-translate-y-1.5">
              <FaGithub className="w-6 h-6 text-white" />
            </div>
            <span className="hero-icon-label group-hover:opacity-100 group-hover:text-white">
              GitHub
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ferdiansyach-845930246/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-item linkedin group flex flex-col items-center text-decoration-none active:scale-95 touch-manipulation"
            aria-label="LinkedIn Profile"
          >
            <div className="hero-icon-container group-hover:scale-110 group-hover:-translate-y-1.5">
              <FaLinkedin className="w-6 h-6 text-white" />
            </div>
            <span className="hero-icon-label group-hover:opacity-100 group-hover:text-white">
              LinkedIn
            </span>
          </a>


        </div>
      </div>

      <style jsx>{`
        .hero-social-item {
          position: relative;
          z-index: 1;
        }

        .hero-icon-container {
          display: inline-flex;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-social-item.contact-item:hover .hero-icon-container {
          background: #7c3aed;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.7);
        }

        .hero-social-item.github:hover .hero-icon-container {
          background: #24292e;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .hero-social-item.linkedin:hover .hero-icon-container {
          background: #0077b5;
          box-shadow: 0 0 20px rgba(0, 119, 181, 0.7);
        }

        .hero-social-item.cv:hover .hero-icon-container {
          background: #10b981;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.7);
        }

        .hero-social-item.portfolio:hover .hero-icon-container {
          background: #0284c7;
          box-shadow: 0 0 20px rgba(2, 132, 199, 0.7);
        }

        .hero-social-item:hover svg {
          animation: icon-shake 0.5s ease-in-out;
        }

        @keyframes icon-shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-3px) rotate(-5deg); }
          40% { transform: translateX(3px) rotate(5deg); }
          60% { transform: translateX(-3px) rotate(-5deg); }
          80% { transform: translateX(3px) rotate(5deg); }
        }

        .hero-icon-label {
          margin-top: 8px;
          font-size: 0.7rem;
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          color: rgba(203, 213, 225, 0.8);
          opacity: 0.8;
          transition: all 0.3s ease;
          letter-spacing: 0.025em;
        }
      `}</style>
    </div>
  );
};

export default HeroSocialConnect;

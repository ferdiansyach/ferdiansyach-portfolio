"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", delay = 0, hover = true }: GlassCardProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`
        glass-card relative overflow-hidden
        ${hover ? "hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(56,189,248,0.15)] hover:border-rose-400/30" : ""}
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${className}
      `}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {/* Shine sweep effect */}
      {hover && (
        <div className="absolute inset-0 z-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 animate-[shine_3s_ease-in-out_infinite]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

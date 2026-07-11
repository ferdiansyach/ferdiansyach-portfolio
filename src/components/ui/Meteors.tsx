"use client";

import { cn } from "@/hooks/cn";
import React from "react";

// A simple deterministic pseudo-random function to ensure render purity and prevent hydration mismatch
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Meteors({
  number = 10,
  className = "",
}: {
  number?: number;
  className?: string;
}) {
  // Generate styles deterministically based on index to satisfy ESLint purity rules
  const meteorStyles = Array.from({ length: number }).map((_, idx) => {
    const leftVal = Math.floor(pseudoRandom(idx * 3 + 1) * 120) - 20;
    const delayVal = (pseudoRandom(idx * 3 + 2) * 2).toFixed(2);
    const durationVal = (pseudoRandom(idx * 3 + 3) * 4 + 2).toFixed(2);

    return {
      top: "-10px",
      left: `${leftVal}%`,
      animationDelay: `${delayVal}s`,
      animationDuration: `${durationVal}s`,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rounded-[9999px] bg-indigo-400 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-[60px] before:h-[1px] before:bg-linear-to-r before:from-transparent before:to-indigo-400/60 before:-translate-x-full",
            className
          )}
          style={style}
        />
      ))}
    </div>
  );
}

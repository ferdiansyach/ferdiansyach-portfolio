"use client";

import { cn } from "@/hooks/cn";
import React, { useEffect, useState } from "react";

export default function Meteors({
  number = 10,
  className = "",
}: {
  number?: number;
  className?: string;
}) {
  const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Generate styles on client only to avoid hydration mismatch
    const styles = Array.from({ length: number }).map(() => ({
      top: "-10px",
      left: Math.floor(Math.random() * 120) - 20 + "%",
      animationDelay: (Math.random() * 2).toFixed(2) + "s",
      animationDuration: (Math.random() * 4 + 2).toFixed(2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

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

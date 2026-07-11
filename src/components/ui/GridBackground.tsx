"use client";

import { cn } from "@/hooks/cn";

interface GridBackgroundProps {
  className?: string;
  gridColor?: string;
  maskColor?: string;
}

export default function GridBackground({
  className = "",
  gridColor = "rgba(124, 58, 237, 0.05)", // Soft violet matching --color-primary
  maskColor = "#121214", // Dark background matching --color-canvas
}: GridBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 h-full w-full bg-[var(--color-canvas)] overflow-hidden z-0 pointer-events-none", className)}>
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, transparent 10%, ${maskColor} 80%), 
                            linear-gradient(to right, ${gridColor} 1px, transparent 1px), 
                            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 45px 45px, 45px 45px",
          backgroundPosition: "center center, center center, center center",
        }}
      />
    </div>
  );
}

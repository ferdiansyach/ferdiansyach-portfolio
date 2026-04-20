"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Only enable on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
      glow.style.display = "none";
      return;
    }

    let x = 0, y = 0;
    let currentX = 0, currentY = 0;

    const handleMouse = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      // Smooth lerp
      currentX += (x - currentX) * 0.08;
      currentY += (y - currentY) * 0.08;
      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse);
    const frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-[1] pointer-events-none w-[400px] h-[400px] rounded-full opacity-[0.04] bg-rose-400 blur-[80px] transition-none"
      aria-hidden="true"
    />
  );
}

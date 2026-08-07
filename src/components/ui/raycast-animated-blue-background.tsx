"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

export function Component() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--color-canvas,#121214)] z-0 pointer-events-none">
      {/* Three.js Shader Animation Background */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <ShaderAnimation className="w-full h-full" />
      </div>

      {/* Radial Blue & Violet Theme Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-600/25 via-indigo-600/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-t from-emerald-500/15 via-cyan-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

      {/* Gradient Vignette overlay for max text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-canvas,#121214)]/60 via-transparent to-[var(--color-canvas,#121214)]/80 pointer-events-none z-0" />

      {/* Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(149, 189, 201, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated Floating Light Beam */}
      <motion.div
        initial={{ opacity: 0.2, y: -80 }}
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[450px] h-[320px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"
      />
    </div>
  );
}

export default Component;

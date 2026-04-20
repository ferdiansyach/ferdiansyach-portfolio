"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for branding + wait for DOM
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_500px_500px_at_50%_50%,rgba(56,189,248,0.08),transparent)]" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Animated Logo Container */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              
              {/* Outer Hexagon (Rotating and Drawing) */}
              <motion.svg
                width="110"
                height="110"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                initial={{ rotate: -90 }}
                animate={{ rotate: 270 }}
                transition={{ duration: 2, ease: "circInOut" }}
              >
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <motion.polygon
                  points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                  stroke="url(#hexGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>

              {/* Inner Elements (Code </> ) */}
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="text-rose-400 absolute z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
              >
                <motion.path
                  d="M10 20l4-16"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                <motion.path
                  d="M7 8l-4 4 4 4"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, x: 10, opacity: 0 }}
                  animate={{ pathLength: 1, x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3, type: "spring" }}
                />
                <motion.path
                  d="M17 8l4 4-4 4"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, x: -10, opacity: 0 }}
                  animate={{ pathLength: 1, x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3, type: "spring" }}
                />
              </motion.svg>

              {/* Core Pulse (Data Dot) */}
              <motion.div 
                className="absolute w-3 h-3 rounded-full bg-sky-300 blur-[1px] shadow-[0_0_15px_#38bdf8]"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              {/* Name */}
              <motion.p
                className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-rose-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Ferdiansyach
              </motion.p>

              {/* Loading bar */}
              <motion.div
                className="w-56 h-1 rounded-full bg-slate-800 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { testimonials } from "@/data/testimonials";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = testimonials[currentIndex];

  // Auto-slide progress — use ref to avoid synchronous setState in effect
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  useEffect(() => {
    if (isPaused) {
      progressRef.current = 0;
      requestAnimationFrame(() => setProgress(0));
      return;
    }
    let start: number | null = null;
    let frame: number;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const p = Math.min((elapsed / 5000) * 100, 100);
      if (Math.abs(p - progressRef.current) > 1) {
        progressRef.current = p;
        setProgress(p);
      }
      if (elapsed < 5000) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [currentIndex, isPaused]);

  return (
    <AnimatedSection className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.testimonials.label} title={translations.testimonials.title} />
      </AnimatedDiv>
      <AnimatedDiv className="max-w-3xl mx-auto">
        <div
          className="glass-card p-10 md:p-14 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote icon */}
          <div className="absolute top-6 left-8 text-6xl font-serif leading-none select-none">
            <span className="bg-gradient-to-r from-rose-400/20 to-fuchsia-500/20 bg-clip-text text-transparent">
              &ldquo;
            </span>
          </div>

          {/* Testimonial content with slide animation */}
          <div className="relative z-10 min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed italic pl-4 border-l-2 border-rose-400/30">
                  {t(current.quote)}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-rose-500/20">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{current.name}</p>
                    <p className="text-slate-400 text-sm">{t(current.role)}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-rose-400 w-8"
                      : "bg-slate-600 hover:bg-slate-500 w-2.5"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:border-rose-400 hover:text-rose-400 transition-all"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:border-rose-400 hover:text-rose-400 transition-all"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Auto-slide progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700/30">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </AnimatedDiv>
    </AnimatedSection>
  );
}

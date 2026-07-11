"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/hooks/cn";

export default function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSvgHeight(entry.target.clientHeight);
      }
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Calculate Dash Offset using scroll position
  const strokeDashoffset = useTransform(springProgress, [0, 1], [svgHeight, 0]);

  return (
    <div ref={ref} style={{ position: "relative" }} className={cn("relative w-full mx-auto h-full", className)}>
      <div className="absolute left-2.5 top-0 bottom-0 pointer-events-none">
        <svg
          viewBox={`0 0 10 ${svgHeight}`}
          width="10"
          height={svgHeight}
          className="h-full overflow-visible"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {/* Background trail */}
          <line
            x1="5"
            y1="0"
            x2="5"
            y2={svgHeight}
            fill="none"
            stroke="var(--color-hairline)"
            strokeWidth="2"
          />
          {/* Glowing trace line */}
          <motion.line
            x1="5"
            y1="0"
            x2="5"
            y2={svgHeight}
            fill="none"
            stroke="url(#tracingBeamGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${svgHeight} ${svgHeight}`,
              strokeDashoffset,
            }}
          />
          <defs>
            <linearGradient id="tracingBeamGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="85%" stopColor="var(--color-primary)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="pl-10">
        {children}
      </div>
    </div>
  );
}

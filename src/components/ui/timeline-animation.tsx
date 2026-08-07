"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TimelineContentProps {
  as?: "div" | "span" | "figure" | "p" | "header" | "section" | "button" | "a";
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function TimelineContent({
  as = "div",
  animationNum = 0,
  timelineRef: _timelineRef,
  customVariants,
  className = "",
  children,
  ...props
}: TimelineContentProps) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={animationNum}
      variants={customVariants || defaultVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

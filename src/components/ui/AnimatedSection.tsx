"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  motion,
  Variants,
  HTMLMotionProps,
  useMotionValue,
  useTransform,
  animate as fmAnimate,
} from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/* ───── Shared variants ───── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/* ───── Wrapper components ───── */
interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function AnimatedDiv({ children, className, variants: v = fadeUp, ...props }: AnimatedDivProps) {
  return (
    <motion.div variants={v} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/* ───── Animated counter ───── */
export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v: number) => Math.floor(v));

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: number) => setDisplay(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (!isInView) return;
    const controls = fmAnimate(motionValue, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  className = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const targetText = text;
    
    intervalRef.current = setInterval(() => {
      const currentReveal = Math.floor((iteration / maxIterations) * targetText.length);
      
      const nextText = targetText
        .split("")
        .map((char, index) => {
          if (index < currentReveal) {
            return targetText[index];
          }
          if (char === " ") return " ";
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (iteration >= maxIterations) {
        setDisplayText(targetText);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      className={className}
      onMouseEnter={startAnimation}
      style={{ display: "inline-block" }}
    >
      {displayText}
    </span>
  );
}

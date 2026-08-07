"use client";

import React, { useRef, useState } from "react";

export interface InfoCardProps {
  image?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  width?: string | number;
  height?: string | number;
  borderColor?: string;
  borderBgColor?: string;
  borderWidth?: number;
  borderPadding?: number;
  cardBgColor?: string;
  shadowColor?: string;
  patternColor1?: string;
  patternColor2?: string;
  textColor?: string;
  hoverTextColor?: string;
  fontFamily?: string;
  effectBgColor?: string;
  contentPadding?: string;
  iconBgGradient?: string;
  layout?: "vertical" | "horizontal";
}

export const InfoCard: React.FC<InfoCardProps> = ({
  image,
  icon,
  title,
  description,
  tags,
  width = "100%",
  height = "100%",
  borderColor = "#7c3aed",
  borderBgColor = "#242424",
  borderWidth = 2,
  borderPadding = 10,
  cardBgColor = "#121214",
  patternColor1 = "rgba(255,255,255,0.03)",
  patternColor2 = "rgba(255,255,255,0.05)",
  textColor = "#f5f5f5",
  hoverTextColor = "#ffffff",
  fontFamily = "var(--font-inter), sans-serif",
  effectBgColor = "#7c3aed",
  contentPadding = "20px 22px",
  iconBgGradient = "from-[var(--color-primary)]/20 to-[var(--color-primary)]/5",
  layout = "vertical",
}) => {
  const [hovered, setHovered] = useState(false);
  const borderRef = useRef<HTMLDivElement>(null);

  // Mouse movement for rotating conic border
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const border = borderRef.current;
    if (!border) return;
    const rect = border.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x);
    border.style.setProperty("--rotation", `${angle}rad`);
  };

  const pattern =
    `linear-gradient(45deg, ${patternColor1} 25%, transparent 25%, transparent 75%, ${patternColor2} 75%),` +
    `linear-gradient(-45deg, ${patternColor2} 25%, transparent 25%, transparent 75%, ${patternColor1} 75%)`;

  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${borderColor} 0deg, ${borderColor} 90deg, ${borderBgColor} 90deg, ${borderBgColor} 360deg)`;

  return (
    <div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (borderRef.current)
          borderRef.current.style.setProperty("--rotation", "0deg");
      }}
      style={{
        width,
        height,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "1.25rem",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: borderPadding,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.3s ease",
        position: "relative",
        fontFamily,
      } as React.CSSProperties}
      className="h-full"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          background: cardBgColor,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          backgroundImage: pattern,
          backgroundSize: "20.84px 20.84px",
          padding: "0",
        }}
      >
        {/* Top Header Icon */}
        <div className="w-full py-5 px-6 flex items-center justify-start border-b border-[var(--color-hairline)] bg-white/5 shrink-0">
          {icon ? (
            <div
              className={`w-13 h-13 rounded-xl bg-gradient-to-br ${iconBgGradient} border border-white/10 flex items-center justify-center transition-transform duration-300 ${
                hovered ? "scale-110 -rotate-3" : ""
              }`}
            >
              {icon}
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </div>

        {/* Content Area (Vertical flow) */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: contentPadding,
            minHeight: 0,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: "-.01em",
                lineHeight: "1.3",
                marginBottom: 10,
                color: hovered ? hoverTextColor : textColor,
                transition: "color 0.3s ease",
                position: "relative",
                overflow: "hidden",
                width: "auto",
              }}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 10,
                  padding: "2px 4px",
                  display: "block",
                  width: "100%",
                }}
              >
                {title}
              </span>
              <span
                style={{
                  clipPath: hovered
                    ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                    : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
                  transformOrigin: "center",
                  transition: "all cubic-bezier(.1,.5,.5,1) 0.4s",
                  position: "absolute",
                  left: -4,
                  right: -4,
                  top: -4,
                  bottom: -4,
                  zIndex: 0,
                  backgroundColor: effectBgColor,
                }}
              />
            </h3>

            <p
              style={{
                fontSize: 13,
                lineHeight: "1.6",
                color: "rgba(226, 232, 240, 0.85)",
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Optional Tech Stack Badges */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[var(--color-hairline)]">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

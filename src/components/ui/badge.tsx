import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-[var(--color-primary)] text-white shadow-xs hover:bg-[var(--color-primary-hover)]",
    secondary: "border-transparent bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20",
    destructive: "border-transparent bg-red-500 text-white shadow-xs hover:bg-red-600",
    outline: "text-[var(--color-body)] border border-[var(--color-hairline)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] shadow-xs transition-all",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };

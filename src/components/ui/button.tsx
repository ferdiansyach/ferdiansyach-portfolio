import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-[var(--color-primary)] text-white shadow-xs hover:bg-[var(--color-primary-hover)]",
      destructive: "bg-red-500 text-white shadow-xs hover:bg-red-600",
      outline: "border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5",
      secondary: "bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] border border-[var(--color-hairline)] hover:border-[var(--color-primary)]",
      ghost: "hover:bg-[var(--color-primary)]/10 text-[var(--color-body)] hover:text-[var(--color-primary)]",
      link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8 text-base",
      icon: "h-9 w-9 p-0 flex items-center justify-center rounded-full",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center shrink-0 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses = {
  primary:
    "bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold shadow-lg hover:shadow-primary/20 hover:opacity-95 active:scale-95 transition-all",
  secondary:
    "bg-surface-container-highest text-primary font-bold hover:bg-surface-bright transition-colors active:scale-95",
  ghost:
    "text-on-surface-variant hover:text-primary hover:bg-surface-bright/40 transition-all",
};

const sizeClasses = {
  default: "px-6 py-2.5 rounded-xl text-sm",
  sm: "px-4 py-1.5 rounded-lg text-xs",
  lg: "px-10 py-3 rounded-xl text-base",
  icon: "p-2 rounded-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

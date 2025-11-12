"use client";
import { cn } from "@/lib/utils";

export function Button({ className = "", variant = "default", ...props }) {
  const base = "px-4 py-2 rounded-lg font-medium transition text-sm";
  const variants = {
    default: "bg-fuchsia-500 hover:bg-fuchsia-600 text-white",
    outline: "border border-border text-muted hover:bg-white/5",
    ghost: "text-muted hover:text-white hover:bg-white/5",
  };
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

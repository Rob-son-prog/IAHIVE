"use client";
import { cn } from "@/lib/utils";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-fuchsia-500 focus:ring-0 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

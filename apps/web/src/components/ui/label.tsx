"use client";
export function Label({ children, className = "" }) {
  return <label className={`text-xs font-medium text-muted ${className}`}>{children}</label>;
}

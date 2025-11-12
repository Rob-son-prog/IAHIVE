"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

const BTN = "text-xs md:text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-2 md:py-1.5 transition-colors relative z-10";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const selected = resolvedTheme === "light" ? "light" : "dark";

  return (
    <div className="relative flex w-fit items-center rounded-full border border-border bg-card">
      <button
        className={`${BTN} ${selected === "light" ? "text-foreground" : "text-muted"}`}
        onClick={() => setTheme("light")}
        aria-label="Ativar tema claro"
      >
        <FiSun className="relative z-10" />
        <span className="relative z-10">Claro</span>
      </button>
      <button
        className={`${BTN} ${selected === "dark" ? "text-foreground" : "text-muted"}`}
        onClick={() => setTheme("dark")}
        aria-label="Ativar tema escuro"
      >
        <FiMoon className="relative z-10" />
        <span className="relative z-10">Escuro</span>
      </button>

      <div className={`absolute inset-0 z-0 flex ${selected === "dark" ? "justify-end" : "justify-start"}`}>
        <motion.span
          layout
          transition={{ type: "spring", damping: 16, stiffness: 260 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600/90"
        />
      </div>
    </div>
  );
}

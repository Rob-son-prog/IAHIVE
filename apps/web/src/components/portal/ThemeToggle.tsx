"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const selected = (mounted ? theme : resolvedTheme) === "light" ? "light" : "dark";

  useEffect(() => setMounted(true), []);

  function handleSelect(next: "light" | "dark") {
    setTheme(next);
    try { localStorage.setItem("iahive-theme", next); } catch {}
  }

  if (!mounted) {
    return (
      <div className="relative flex w-fit items-center rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-400">
        Tema
      </div>
    );
  }

  return (
    <div className="relative flex w-fit items-center rounded-full border border-neutral-800 bg-neutral-950">
      <button
        className={`${TOGGLE_CLASSES} ${selected === "light" ? "text-white" : "text-slate-300"}`}
        onClick={() => handleSelect("light")}
        aria-label="Ativar tema claro"
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Claro</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${selected === "dark" ? "text-white" : "text-slate-800"}`}
        onClick={() => handleSelect("dark")}
        aria-label="Ativar tema escuro"
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Escuro</span>
      </button>
      <div className={`absolute inset-0 z-0 flex ${selected === "dark" ? "justify-end" : "justify-start"}`}>
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
}

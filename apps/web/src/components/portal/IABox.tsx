"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  title: string;
  desc: string;
  href: string;
  emoji?: string;
  bgSrc?: string;
  icon?: React.ReactNode;
};

export default function IABox({ title, desc, href, emoji, bgSrc, icon }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMx(x);
    setMy(y);

    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    setRy(px * 6);
    setRx(-py * 6);
  }

  function onLeave() {
    setRx(0);
    setRy(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ia-box group relative overflow-hidden rounded-2xl border bg-card shadow-sm elev-card elev-ring"
      style={{
        transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        transition: "transform 120ms ease",
      }}
    >
      {/* imagem de fundo */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: bgSrc ? `url(${bgSrc})` : undefined,
          backgroundColor: bgSrc ? undefined : "var(--muted, #0f1115)",
        }}
        aria-hidden
      />

      {/* brilho seguindo o mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px at ${mx}px ${my}px, rgba(255,255,255,0.22), transparent 60%)`,
          mixBlendMode: "soft-light",
        }}
        aria-hidden
      />

      {/* overlay para legibilidade */}
      <div
        className="ia-overlay absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent dark:from-black/65 dark:via-black/25 dark:to-black/10"
        aria-hidden
      />

      {/* conteúdo */}
      <div className="relative z-10 flex h-56 flex-col justify-end p-5 md:p-6">
        <div className="flex items-center gap-2">
          {(icon || emoji) && (
            <span className="flex items-center justify-center rounded-lg p-1.5 backdrop-blur-sm bg-black/40 text-white dark:bg-white/10 dark:text-white">
              {icon ? (
                <span className="h-5 w-5">{icon}</span>
              ) : (
                <span className="text-xl leading-none">{emoji}</span>
              )}
            </span>
          )}
          <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow">
            {title}
          </h3>
        </div>

        <p className="mt-1 text-sm text-white/85 line-clamp-2">{desc}</p>

        <div className="mt-4">
          <Link href={href} className="btn-ia">
            Abrir IA
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* borda com luz sutil */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition group-hover:ring-white/25" aria-hidden />
    </div>
  );
}

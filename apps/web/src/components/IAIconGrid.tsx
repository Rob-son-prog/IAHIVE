"use client";

import Image from "next/image";

type Logo = { label: string; img: string };

const LOGOS: Logo[] = [
  { label: "OpenAI",            img: "/logos/openai.svg" },
  { label: "Claude",            img: "/logos/claude.png" },       // ajuste se sua extensão for outra
  { label: "Gemini",            img: "/logos/gemini.png" },
  { label: "Leonardo",          img: "/logos/leonardo.webp" },
  { label: "Perplexity",        img: "/logos/perplexity.webp" },
  { label: "Veo 3",             img: "/logos/veo3.png" },
];

export default function IAIconGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {LOGOS.map((l) => (
        <div
          key={l.label}
          className="group rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur
                     hover:bg-white/[0.07] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md overflow-hidden bg-white">
              {l.img.endsWith(".svg") ? (
                <img src={l.img} alt={l.label} width={28} height={28} />
              ) : (
                <Image src={l.img} alt={l.label} width={28} height={28} />
              )}
            </span>
            <span className="text-sm text-neutral-200 group-hover:text-white transition-colors">
              {l.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

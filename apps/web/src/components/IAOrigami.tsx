"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Logo = { label: string; img: string; className?: string };

// AJUSTE as extensões conforme seus arquivos reais em /public/logos
const LOGOS: Logo[] = [
  { label: "OpenAI",            img: "/logos/openai.svg" },
  { label: "Claude",            img: "/logos/claude.png" },
  { label: "Gemini",            img: "/logos/gemini.png" },
  { label: "Llama",             img: "/logos/llama.svg" },
  { label: "Stable Diffusion",  img: "/logos/stable-diffusion.svg" },
  { label: "Midjourney",        img: "/logos/midjourney.svg" },
  { label: "Leonardo",          img: "/logos/leonardo.webp" },
  { label: "Perplexity",        img: "/logos/perplexity.webp" },
  { label: "Veo 3",             img: "/logos/veo3.png" },
];

const DELAY_MS = 2500;
const DUR_S = 1.2;

export default function IAOrigami() {
  const items = LOGOS.map((l, i) => (
    <LogoItem key={i} className="bg-white/5 border border-white/10 text-neutral-100">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md overflow-hidden bg-white">
          {l.img.endsWith(".svg") ? (
            <img src={l.img} alt={l.label} width={28} height={28} />
          ) : (
            <Image src={l.img} alt={l.label} width={28} height={28} />
          )}
        </span>
        <span className="text-base font-medium">{l.label}</span>
      </div>
    </LogoItem>
  ));

  return (
    <section className="flex h-72 flex-col items-center justify-center gap-12">
      <LogoRolodex items={items} />
    </section>
  );
}

function LogoRolodex({ items }: { items: React.ReactNode[] }) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => setIndex((pv) => pv + 1), DELAY_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div
      style={{ transform: "rotateY(-20deg)", transformStyle: "preserve-3d" }}
      className="relative z-0 h-44 w-72 shrink-0 rounded-xl border border-white/10 bg-neutral-900/60"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{ y: "-50%", x: "-50%", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", zIndex: -index, backfaceVisibility: "hidden" }}
          key={index}
          transition={{ duration: DUR_S, ease: "easeInOut" }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>

        <motion.div
          style={{ y: "-50%", x: "-50%", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)", zIndex: index, backfaceVisibility: "hidden" }}
          key={(index + 1) * 2}
          transition={{ duration: DUR_S, ease: "easeInOut" }}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>

      <hr style={{ transform: "translateZ(1px)" }} className="absolute left-0 right-0 top-1/2 z-[5] -translate-y-1/2 border-t-2 border-white/10" />
    </div>
  );
}

function LogoItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge("grid h-36 w-60 place-content-center rounded-lg bg-neutral-800 text-xl text-neutral-50 px-4", className)}>
      {children}
    </div>
  );
}

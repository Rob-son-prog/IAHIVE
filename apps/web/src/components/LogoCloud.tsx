"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Eye, Waves, ListChecks, Network } from "lucide-react";

export type Item = {
  label: string;
  img?: string;   // imagem local (public/logos/*)
  kind?: "tts" | "vision" | "reranker" | "embeddings"; // fallback por função
  bg?: string;    // gradiente do dot/ícone
  imgScale?: number; // escala visual SÓ da imagem (pílula permanece 16x16)
};

// Mapa para logos de marcas via Iconify (Simple Icons)
const ICONIFY_BRANDS: Record<string, string> = {
  OpenAI: "simple-icons:openai",
  Claude: "simple-icons:anthropic",
  Gemini: "simple-icons:google",
  Llama: "simple-icons:meta",
  "Stable Diffusion": "simple-icons:stabilityai",
  Midjourney: "simple-icons:midjourney",
  Leonardo: "simple-icons:leonardoai",
  Perplexity: "simple-icons:perplexity",
  "Veo 3": "simple-icons:google",
  Whisper: "simple-icons:openai",
  "DALL·E": "simple-icons:openai",
};

/** Linha de cima */
const ROW_A: Item[] = [
  { label: "OpenAI",           bg: "from-cyan-400 to-indigo-500" },
  { label: "Claude",           img: "/logos/claude.webp",          bg: "from-fuchsia-500 to-violet-500" },
  { label: "Gemini",           bg: "from-sky-400 to-blue-500" },
  { label: "Llama",            bg: "from-emerald-400 to-teal-500" },
  { label: "Stable Diffusion", img: "/logos/stable-diffusion.svg", bg: "from-rose-400 to-orange-500" },
  { label: "Midjourney",       img: "/logos/midjourney.svg",       bg: "from-amber-400 to-pink-500" },
  // Leonardo: usa imagem local + escala visual 3x (pílula segue 16x16)
  { label: "Leonardo",         img: "/logos/leonardo.webp",        bg: "from-purple-500 to-pink-500", imgScale: 3 },
  { label: "Perplexity",       bg: "from-sky-500 to-indigo-600" },
  { label: "Veo 3",            bg: "from-amber-500 to-orange-600" },
];

/** Linha de baixo */
const ROW_B: Item[] = [
  { label: "Whisper",    kind: "tts",        bg: "from-indigo-400 to-cyan-500" },
  { label: "DALL·E",                          bg: "from-pink-500 to-rose-500" },
  { label: "TTS",        kind: "tts",        bg: "from-teal-400 to-emerald-500" },
  { label: "Reranker",   kind: "reranker",   bg: "from-violet-400 to-fuchsia-500" },
  { label: "Embeddings", kind: "embeddings", bg: "from-blue-400 to-sky-500" },
  { label: "Vision",     kind: "vision",     bg: "from-orange-400 to-amber-500" },
];

function FallbackGlyph({ kind }: { kind?: Item["kind"] }) {
  if (kind === "tts") return <Waves size={12} />;
  if (kind === "vision") return <Eye size={12} />;
  if (kind === "reranker") return <ListChecks size={12} />;
  if (kind === "embeddings") return <Network size={12} />;
  return <Waves size={12} />;
}

function BrandIcon({ label, size = 16 }: { label: string; size?: number }) {
  const name = ICONIFY_BRANDS[label];
  if (!name) return null;
  return (
    <span
      className="inline-flex items-center justify-center rounded-md bg-neutral-900"
      style={{ width: size, height: size }}
    >
      <Icon icon={name} width={Math.round(size * 0.75)} height={Math.round(size * 0.75)} />
    </span>
  );
}

function Pill({ item }: { item: Item }) {
  const [failed, setFailed] = useState(false);
  const hasImg = Boolean(item.img) && !failed;

  // Todas as pílulas 16x16
  const size = 16;
  // Escala visual só da imagem (padrão 1)
  const scale = item.imgScale ?? 1;

  return (
    <div
      className="shrink-0 mx-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur hover:bg-white/[0.08] transition-colors"
      aria-label={item.label}
      title={item.label}
    >
      <div className="flex items-center gap-2">
        {hasImg ? (
          <span
            className="inline-flex items-center justify-center rounded-md bg-neutral-900"
            style={{ width: size, height: size, overflow: "visible" }} // pílula fixa; só a imagem escala
          >
            <img
              src={item.img}
              alt={item.label}
              width={size}
              height={size}
              loading="lazy"
              onError={() => setFailed(true)}
              style={{
                display: "block",
                transform: `scale(${scale})`,
                transformOrigin: "center",
              }}
            />
          </span>
        ) : ICONIFY_BRANDS[item.label] ? (
          <BrandIcon label={item.label} size={size} />
        ) : (
          <span
            className={`inline-flex items-center justify-center rounded-md text-white/90 bg-gradient-to-tr ${item.bg ?? "from-cyan-400 to-indigo-500"}`}
            style={{ width: size, height: size }}
          >
            <FallbackGlyph kind={item.kind} />
          </span>
        )}
        <span className="text-sm text-neutral-200 whitespace-nowrap">{item.label}</span>
      </div>
    </div>
  );
}

function Row({
  items,
  reverse = false,
  duration = 28,
}: {
  items: Item[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  const dirClass = reverse ? "marquee-reverse" : "marquee";

  return (
    <div className="overflow-hidden">
      <div
        className={`flex select-none ${dirClass}`}
        style={
          {
            // CSS var para duração da animação
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((it, i) => (
          <Pill key={`${it.label}-${i}`} item={it} />
        ))}
      </div>

      <style jsx>{`
        .marquee,
        .marquee-reverse {
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee {
          animation-name: marquee;
          animation-duration: var(--marquee-duration, 28s);
        }
        .marquee-reverse {
          animation-name: marquee-reverse;
          animation-duration: var(--marquee-duration, 28s);
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(99,102,241,0.25), transparent 60%)",
        }}
      />
      <div className="space-y-3">
        <Row items={ROW_A} duration={26} />
        <Row items={ROW_B} reverse duration={30} />
      </div>
    </div>
  );
}

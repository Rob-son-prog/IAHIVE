"use client";

import Image from "next/image";
import { useEffect } from "react";

/* =========================================================
   Mapas de logos oficiais (public/models) + alts
   ========================================================= */
export const MODEL_LOGOS: Record<string, string> = {
  // IMAGENS (já existiam)
  leonardo: "/models/leonardo.svg",
  "openai-dalle3": "/models/openai-dalle3.svg",
  "nano-banana": "/models/nano-banana.svg",
  "stability-sd": "/models/stability-sd.svg",
  getimg: "/models/getimg.svg",
  "bedrock-titan": "/models/bedrock-titan.svg",
  clipdrop: "/models/clipdrop.svg",
  "getimg-2": "/models/getimg-2.svg",

  // TEXTO (novos)  
   "gpt-5": "/models/gpt-5.svg",          // <- GPT-5
  "gpt-4o": "/models/gpt-4o.svg",
  "claude-3-opus": "/models/claude-3-opus.svg",
  "gemini-1.5-pro": "/models/gemini-1.5-pro.svg", // <- Gemini
  "mistral-large": "/models/mistral-large.svg",
  "groq-llama3": "/models/groq-llama3.svg",
  "cohere-command-r-plus": "/models/cohere-command-r-plus.svg",
  "perplexity-pplx-online": "/models/perplexity-pplx-online.svg",
};

export const MODEL_ALTS: Record<string, string> = {
  // IMAGENS
  leonardo: "Leonardo AI",
  "openai-dalle3": "OpenAI (DALL·E 3)",
  "stability-sd": "Stability AI (Stable Diffusion)",
  "nano-banana": "Nano Banana",
  getimg: "getimg.ai",
  "getimg-2": "getimg.ai (modelo 2)",
  clipdrop: "Clipdrop",
  "bedrock-titan": "Amazon Bedrock (Titan)",

  // TEXTO
  "gpt-5": "OpenAI GPT-5",               // <- GPT-5
  "gpt-4o": "OpenAI GPT-4o",
  "claude-3-opus": "Anthropic Claude 3 Opus",
  "gemini-1.5-pro": "Google Gemini 1.5 Pro",
  "mistral-large": "Mistral Large",
  "groq-llama3": "Groq Llama 3",
  "cohere-command-r-plus": "Cohere Command R+",
  "perplexity-pplx-online": "Perplexity pplx-online",
};


/* =========================================================
   Logos (usa arquivo de /public/models se houver; senão, inline)
   ========================================================= */
function ModelLogo({ id, active }: { id: string; active?: boolean }) {
  const base = "h-12 w-12 shrink-0 rounded-lg";
  const dim = active ? "" : "opacity-95";

  // tenta usar asset oficial em /public/models
  const src = MODEL_LOGOS[id];
  if (src) {
    return (
      <div className={`${base} ${dim} overflow-hidden bg-white/5`}>
        <Image
          src={src}
          alt={MODEL_ALTS[id] ?? "Modelo"}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          priority={false}
        />
      </div>
    );
  }

  // fallback: SVGs inline existentes
  switch (id) {
    case "openai-dalle3":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="#06b6d4" />
          <path
            d="M24 13l7 7-7 7-7-7 7-7zm0 14l7 7-7 1-7-1 7-7z"
            fill="rgba(255,255,255,.92)"
          />
        </svg>
      );

    case "stability-sd":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="#3b82f6" />
          <circle cx="18" cy="20" r="6" fill="rgba(255,255,255,.92)" />
          <rect x="24" y="18" width="10" height="12" rx="2" fill="rgba(255,255,255,.92)" />
        </svg>
      );

    case "nano-banana":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="#f59e0b" />
          <path d="M14 29c8 8 18 7 20-5-2 2-6 2-9 1-4-1-7-6-7-6-2 4-2 7-4 10z" fill="#fde68a" />
        </svg>
      );

    case "getimg":
    case "getimg-2":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <defs>
            <linearGradient id="gi" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ec4899" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#gi)" />
          <circle cx="24" cy="24" r="10" fill="rgba(255,255,255,.9)" />
          <rect x="20" y="20" width="8" height="8" rx="2" fill="url(#gi)" />
        </svg>
      );

    case "clipdrop":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="#10b981" />
          <path d="M16 18h16v4H16zM16 26h12v4H16z" fill="rgba(255,255,255,.92)" />
        </svg>
      );

    case "bedrock-titan":
      return (
        <svg viewBox="0 0 48 48" className={`${base} ${dim}`}>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="#f97316" />
          <path d="M16 30h16l-8-12-8 12z" fill="rgba(255,255,255,.92)" />
        </svg>
      );

    default:
      return (
        <div
          className={`${base} ${
            active
              ? "bg-gradient-to-br from-rose-400/90 via-pink-500/80 to-fuchsia-500/80"
              : "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"
          }`}
        />
      );
  }
}

/* =========================================================
   Tipos originais
   ========================================================= */
export type ModelInfo = {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
};

type Props = {
  open: boolean;
  value: string;
  onClose: () => void;
  onSelect: (id: string) => void;
  models: ModelInfo[];
};

/* =========================================================
   Componente principal
   ========================================================= */
export default function ModelPicker({ open, value, onClose, onSelect, models }: Props) {
  // fechar no ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* modal */}
      <div className="relative z-10 w-[min(960px,95vw)] max-height-[85vh] max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="text-lg font-semibold">Escolher modelo</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-neutral-300 hover:bg-white/5"
          >
            Fechar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
          {models.map((m) => {
            const active = m.id === value;
            return (
              <button
                key={m.id}
                onClick={() => {
                  onSelect(m.id);
                  onClose();
                }}
                className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-rose-500/40 bg-rose-500/15 shadow-[0_0_0_1px_rgba(244,63,94,.35)_inset,0_10px_30px_rgba(244,63,94,.12)]"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {/* >>> LOGO DO MODELO <<< */}
                <ModelLogo id={m.id} active={active} />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{m.name}</span>
                    {m.badge && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-neutral-300">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-neutral-400">{m.subtitle}</p>
                </div>

                {active && (
                  <span className="ml-auto rounded-md border border-rose-400/40 bg-rose-500/15 px-2 py-0.5 text-xs text-rose-200">
                    Selecionado
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

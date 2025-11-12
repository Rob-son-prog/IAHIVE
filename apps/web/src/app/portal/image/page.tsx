"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CreditBar from "../../../components/portal/CreditBar";
import PromptBox from "../../../components/portal/PromptBox";
import { userMock } from "../../../data/portal-mock";
import ModelPicker, {
  ModelInfo,
  MODEL_LOGOS,
  MODEL_ALTS,
} from "../../../components/portal/ModelPicker";

type Img = { id: string; url: string; w: number; h: number };

type Aspect = "2:3" | "1:1" | "16:9";
type Quality = "fast" | "ultra";

const ASPECT_SIZES: Record<Aspect, { w: number; h: number }> = {
  "2:3": { w: 768, h: 1152 },
  "1:1": { w: 1024, h: 1024 },
  "16:9": { w: 1440, h: 810 },
};

const QUALITY_SCALE: Record<Quality, number> = { fast: 1, ultra: 1.25 };

/** Lista de modelos exibidos no modal + chip. */
const ALL_MODELS: ModelInfo[] = [
  { id: "leonardo",       name: "Leonardo.Ai",                          subtitle: "Render versátil e rápido",           badge: "NEW" },
  { id: "openai-dalle3",  name: "OpenAI (DALL·E 3)",                    subtitle: "Coerência e texto" },
  { id: "stability-sd",   name: "Stability AI (Stable Diffusion)",      subtitle: "Modelos SD populares" },
  { id: "nano-banana",    name: "Nano Banana",                          subtitle: "Edição e visuais inteligentes",     badge: "NEW" },
  { id: "getimg",         name: "Getimg.ai",                            subtitle: "Geração multimodelos" },
  { id: "clipdrop",       name: "ClipDrop API (Stability)",             subtitle: "Ferramentas da Stability" },
  { id: "getimg-2",       name: "Getimg.ai (alt)",                      subtitle: "Variação/backup" },
  { id: "bedrock-titan",  name: "Amazon Bedrock (Titan Image)",         subtitle: "Integração AWS" },
];

export default function ImagePage() {
  const [images, setImages] = useState<Img[]>([]);
  const [aspect, setAspect] = useState<Aspect>("1:1");
  const [quality, setQuality] = useState<Quality>("fast");
  const [count, setCount] = useState(4);
  const [model, setModel] = useState<string>(ALL_MODELS[0].id);
  const [privateMode, setPrivateMode] = useState(false);
  const [refImage, setRefImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  function toSize(a: Aspect, q: Quality) {
    const base = ASPECT_SIZES[a];
    const s = QUALITY_SCALE[q];
    return { w: Math.round(base.w * s), h: Math.round(base.h * s) };
  }

  async function handleGenerate(prompt: string) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const seed = Math.abs(prompt.length % 10) + 1;
    const { w, h } = toSize(aspect, quality);
    const batch = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}_${i}`,
      url: `https://picsum.photos/seed/${seed}-${i}/${w}/${h}`,
      w,
      h,
    }));
    setImages(batch);
    setLoading(false);
  }

  const modelLabel = ALL_MODELS.find((m) => m.id === model)?.name ?? "Escolher modelo";

  return (
    <div data-page="portal-image" className="mx-auto w-full max-w-7xl p-4 md:p-6">
      {/* Voltar para /portal */}
      <div className="mb-3">
        <Link
          href="/portal"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-neutral-200 dark:hover:bg-white/5"
        >
          <span className="inline-block h-4 w-4 rounded-full border border-border text-center leading-[14px]">←</span>
          Voltar
        </Link>
      </div>

      <CreditBar credits={userMock.credits} usageThisMonth={userMock.usageThisMonth} />

      <div className="mt-6 flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Imagens</h1>
        <p className="text-sm text-muted-foreground">
          Escreva o prompt, escolha o modelo, o tamanho e a qualidade. Depois clique em <b>Gerar</b>.
        </p>
      </div>

      {/* Toolbar */}
      <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4">
        {/* Aspect */}
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Image Dimensions</div>
          <div className="inline-flex overflow-hidden rounded-xl border border-border">
            {(["2:3", "1:1", "16:9"] as Aspect[]).map((a) => {
              const active = aspect === a;
              return (
                <button
                  key={a}
                  onClick={() => setAspect(a)}
                  className={
                    active
                      ? "leo-chip-active px-3 py-2 text-sm transition"
                      : "px-3 py-2 text-sm transition text-slate-700 hover:bg-slate-50 dark:text-neutral-300 dark:hover:bg-white/5"
                  }
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality */}
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Generation Mode</div>
          <div className="inline-flex overflow-hidden rounded-xl border border-border">
            {(["fast", "ultra"] as Quality[]).map((q) => {
              const active = quality === q;
              return (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={
                    active
                      ? "leo-chip-active px-3 py-2 text-sm capitalize transition"
                      : "px-3 py-2 text-sm capitalize transition text-slate-700 hover:bg-slate-50 dark:text-neutral-300 dark:hover:bg-white/5"
                  }
                >
                  {q}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <div>
          <div className="mb-2 text-xs text-muted-foreground">Number of images</div>
          <div className="inline-flex overflow-hidden rounded-xl border border-border">
            {[1, 2, 3, 4].map((n) => {
              const active = count === n;
              return (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={
                    active
                      ? "leo-chip-active px-3 py-2 text-sm transition"
                      : "px-3 py-2 text-sm transition text-slate-700 hover:bg-slate-50 dark:text-neutral-300 dark:hover:bg-white/5"
                  }
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Private + Upload */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="mb-2 text-xs text-muted-foreground">Private Mode</div>
            <button
              onClick={() => setPrivateMode((v) => !v)}
              className={
                privateMode
                  ? "leo-chip-active w-full rounded-xl border border-border px-3 py-2 text-sm transition"
                  : "w-full rounded-xl border border-border px-3 py-2 text-sm transition text-slate-700 hover:bg-slate-50 dark:text-neutral-300 dark:hover:bg-white/5"
              }
            >
              {privateMode ? "Enabled" : "Disabled"}
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-2 text-xs text-muted-foreground">Imagem de referência</div>
            <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-neutral-300 dark:hover:bg-white/5">
              Carregar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setRefImage(e.target.files?.[0] ?? null)}
              />
            </label>
            {refImage && <div className="mt-1 truncate text-[11px] text-muted-foreground">{refImage.name}</div>}
          </div>
        </div>

        {/* Model button */}
        <div className="md:col-span-2 lg:col-span-4">
          <div className="mb-2 text-xs text-muted-foreground">Model</div>
          <button
            onClick={() => setModelOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-neutral-200 dark:hover:bg-white/5"
          >
            {/* Ícone do modelo selecionado */}
            <span className="inline-flex h-5 w-5 overflow-hidden rounded">
              <Image
                src={MODEL_LOGOS[model] ?? "/models/leonardo.svg"}
                alt={MODEL_ALTS[model] ?? "Modelo"}
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </span>
            {modelLabel}
          </button>
        </div>
      </div>

      {/* Prompt */}
      <div className="mt-4">
        <PromptBox
          placeholder="Ex.: logo cyberpunk com raposa, iluminação neon, bokeh, 32mm, DOF, 4k"
          onGenerate={handleGenerate}
          buttonLabel={loading ? "Gerando..." : "Gerar"}
          disabled={loading}
        />
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img) => (
          <figure key={img.id} className="overflow-hidden rounded-2xl border border-border bg-card dark:bg-neutral-900/40">
            <div
              className="w-full"
              style={{
                aspectRatio: `${img.w} / ${img.h}`,
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <figcaption className="flex items-center justify-between px-3 py-2 text-[11px] text-muted-foreground">
              <span>
                {img.w}×{img.h} · {quality.toUpperCase()}
              </span>
              <button className="rounded-lg border border-border px-2 py-1 text-slate-700 hover:bg-slate-50 dark:text-neutral-200 dark:hover:bg-white/5">
                Baixar
              </button>
            </figcaption>
          </figure>
        ))}
        {images.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card/70 p-6 text-sm text-muted-foreground dark:border-neutral-800 dark:bg-neutral-950/60">
            As imagens geradas aparecerão aqui.
          </div>
        )}
      </div>

      {/* Modal de modelos */}
      <ModelPicker
        open={modelOpen}
        value={model}
        onClose={() => setModelOpen(false)}
        onSelect={(id) => setModel(id)}
        models={ALL_MODELS}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Download, Sparkles, Video, Image as ImageIcon, X } from "lucide-react";

import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";

type VideoProvider = "google-veo" | "runway" | "pika";

type VideoModel = {
  id: string;
  name: string;
  description: string;
  provider: VideoProvider;
  badge?: "Recomendado" | "Rápido" | "Cinema";
};

const VIDEO_MODELS: VideoModel[] = [
  {
    id: "google-veo-3",
    name: "Google Veo 3 (IA Vídeo)",
    description: "Vídeos cinematográficos com alto nível de detalhe.",
    provider: "google-veo",
    badge: "Cinema",
  },
  {
    id: "runway-gen-3",
    name: "Runway Gen-3 Alpha",
    description: "Ótimo equilíbrio entre qualidade e velocidade.",
    provider: "runway",
    badge: "Recomendado",
  },
  {
    id: "pika-1-0",
    name: "Pika 1.0",
    description: "Vídeos rápidos para social media e criativos curtos.",
    provider: "pika",
    badge: "Rápido",
  },
];

type VideoConfig = {
  modelId: string;
  durationSeconds: number;
  aspectRatio: string;
  resolution: string;
  quality: string;
};

type VideoPreset = {
  id: string;
  label: string;
  description: string;
  config: VideoConfig;
};

const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: "reels-oferta",
    label: "Reels de oferta",
    description: "9:16, 12s, Full HD – ideal para ofertas rápidas.",
    config: {
      modelId: "runway-gen-3",
      durationSeconds: 12,
      aspectRatio: "9:16",
      resolution: "1080p",
      quality: "padrao",
    },
  },
  {
    id: "youtube-horizontal",
    label: "YouTube horizontal",
    description: "16:9, 30s, Full HD – estilo vídeo principal.",
    config: {
      modelId: "google-veo-3",
      durationSeconds: 30,
      aspectRatio: "16:9",
      resolution: "1080p",
      quality: "cinema",
    },
  },
  {
    id: "feed-quadrado",
    label: "Criativo rápido (feed)",
    description: "1:1, 8s, HD – testes A/B de criativo.",
    config: {
      modelId: "pika-1-0",
      durationSeconds: 8,
      aspectRatio: "1:1",
      resolution: "720p",
      quality: "rascunho",
    },
  },
];

type GeneratedVideo = {
  id: string;
  prompt: string;
  modelId: string;
  provider: VideoProvider;
  createdAt: Date;
  durationSeconds: number;
  aspectRatio: string;
  resolution: string;
  quality: string;
  hasImageBase: boolean;
  imagePreviewUrl?: string | null;
};

export default function VideoPortalPage() {
  const [selectedModel, setSelectedModel] = useState<string>(
    VIDEO_MODELS[1]?.id ?? VIDEO_MODELS[0]?.id ?? ""
  );
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(12); // em segundos
  const [aspectRatio, setAspectRatio] = useState("9:16"); // vertical default
  const [resolution, setResolution] = useState("1080p");
  const [quality, setQuality] = useState("padrao");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);

  // imagem base (opcional)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleApplyPreset = (preset: VideoPreset) => {
    const { modelId, durationSeconds, aspectRatio, resolution, quality } =
      preset.config;

    setSelectedModel(modelId);
    setDuration(durationSeconds);
    setAspectRatio(aspectRatio);
    setResolution(resolution);
    setQuality(quality);
    setActivePresetId(preset.id);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // opcional: limitar tipos de arquivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem (JPG, PNG, etc).");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const url = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(url);
  };

  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  useEffect(() => {
    // cleanup quando o componente desmontar
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleGenerate = () => {
    if (!prompt.trim() || !selectedModel) return;

    const model = VIDEO_MODELS.find((m) => m.id === selectedModel);
    if (!model) return;

    setIsGenerating(true);

    // Simulação de geração de vídeo (integração real vem depois)
    setTimeout(() => {
      const newVideo: GeneratedVideo = {
        id: crypto.randomUUID(),
        prompt: prompt.trim(),
        modelId: selectedModel,
        provider: model.provider,
        createdAt: new Date(),
        durationSeconds: duration,
        aspectRatio,
        resolution,
        quality,
        hasImageBase: !!imageFile,
        imagePreviewUrl: imagePreview ?? null,
      };

      setVideos((prev) => [newVideo, ...prev]);
      setIsGenerating(false);
    }, 800);
  };

  const hasVideos = videos.length > 0;
  const currentModel = VIDEO_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-6 lg:px-6">
        {/* Topo: Voltar + CreditBar */}
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Link>

            <div className="flex flex-col">
              <h1 className="flex items-center gap-2 text-sm font-medium text-slate-200 md:text-base">
                IA.HIVE Vídeo
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-purple-200">
                  <Sparkles className="h-3 w-3" />
                  Beta
                </span>
              </h1>
              <p className="text-xs text-slate-400 md:text-sm">
                Gere vídeos curtos, criativos e cinematográficos usando modelos
                de IA de última geração.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <CreditBar
              credits={userMock.credits}
              usageThisMonth={userMock.usageThisMonth}
            />
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Card principal de geração de vídeo */}
          <section className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-b from-purple-500/10 via-slate-950 to-slate-950 p-4 shadow-[0_0_40px_rgba(168,85,247,0.35)] md:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(168,85,247,0.65),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_55%)]" />

              <div className="relative space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-200/80">
                    Gerador de vídeo
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-50 md:text-2xl">
                    Crie vídeos prontos para anúncios, reels e YouTube Shorts
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Use um preset pronto ou ajuste o modelo de IA, tamanho,
                    qualidade e imagem base para o seu objetivo.
                  </p>
                </div>

                {/* Presets rápidos */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Presets rápidos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {VIDEO_PRESETS.map((preset) => {
                      const isActive = preset.id === activePresetId;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleApplyPreset(preset)}
                          className={[
                            "group flex flex-col rounded-xl border px-3 py-2 text-left text-xs md:text-[13px] transition",
                            isActive
                              ? "border-purple-400 bg-purple-500/20 text-purple-50 shadow-[0_0_18px_rgba(168,85,247,0.6)]"
                              : "border-slate-700/80 bg-slate-950/70 text-slate-200 hover:border-purple-400/80 hover:bg-purple-500/10",
                          ].join(" ")}
                        >
                          <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                            {preset.label}
                            {preset.id === "reels-oferta" && (
                              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[9px] font-semibold text-purple-100">
                                Social
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 text-[11px] text-slate-300/90">
                            {preset.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Imagem base (opcional) */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Imagem base (opcional)
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label className="group flex flex-1 cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/70 px-3 py-2 transition hover:border-purple-400/80 hover:bg-purple-500/5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/80 text-purple-200 ring-1 ring-purple-500/40">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-slate-100">
                            {imageFile ? "Alterar imagem base" : "Enviar imagem para animar"}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            JPG, PNG – a IA vai gerar o vídeo a partir desta cena.
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>

                    {imagePreview && (
                      <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-2 py-1.5">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imagePreview}
                            alt="Pré-visualização da imagem base"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={clearImage}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-200 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-200"
                        >
                          <X className="h-3 w-3" />
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Ex.: envie uma foto do bolo japonês, de um produto ou de uma pessoa,
                    e a IA gera um vídeo animando essa cena com base no prompt.
                  </p>
                </div>

                {/* Modelos de vídeo */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Modelo de vídeo (IA)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {VIDEO_MODELS.map((model) => {
                      const isActive = model.id === selectedModel;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => {
                            setSelectedModel(model.id);
                            setActivePresetId(null); // saiu do preset
                          }}
                          className={[
                            "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs md:text-sm transition",
                            isActive
                              ? "border-purple-400 bg-purple-500/20 text-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.65)]"
                              : "border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-purple-400/80 hover:bg-purple-500/10",
                          ].join(" ")}
                        >
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-[10px] font-semibold text-purple-200 ring-1 ring-purple-500/40">
                            <Video className="h-3 w-3" />
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="leading-none">{model.name}</span>
                            <span className="mt-0.5 text-[10px] leading-none text-slate-300/80">
                              {model.description}
                            </span>
                          </div>
                          {model.badge && (
                            <span className="ml-1 inline-flex items-center rounded-full bg-slate-950/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-purple-200 ring-1 ring-purple-500/60">
                              {model.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Controles de tamanho e qualidade */}
                <div className="mt-3 grid gap-3 text-xs text-slate-200 md:grid-cols-4">
                  {/* Proporção */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Proporção
                    </label>
                    <select
                      value={aspectRatio}
                      onChange={(e) => {
                        setAspectRatio(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="9:16">9:16 (Vertical – Reels/TikTok)</option>
                      <option value="16:9">16:9 (Horizontal – YouTube)</option>
                      <option value="1:1">1:1 (Quadrado – Feed)</option>
                    </select>
                  </div>

                  {/* Duração */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Duração (segundos)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={3}
                        max={60}
                        step={1}
                        value={duration}
                        onChange={(e) => {
                          setDuration(parseInt(e.target.value));
                          setActivePresetId(null);
                        }}
                        className="flex-1 accent-purple-500"
                      />
                      <span className="w-10 text-right text-[11px] text-slate-200">
                        {duration}s
                      </span>
                    </div>
                  </div>

                  {/* Resolução */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Resolução
                    </label>
                    <select
                      value={resolution}
                      onChange={(e) => {
                        setResolution(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="720p">HD – 720p</option>
                      <option value="1080p">Full HD – 1080p</option>
                      <option value="4k">4K (Cinema)</option>
                    </select>
                  </div>

                  {/* Qualidade */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Qualidade
                    </label>
                    <select
                      value={quality}
                      onChange={(e) => {
                        setQuality(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="rascunho">Rascunho (teste rápido)</option>
                      <option value="padrao">Padrão</option>
                      <option value="cinema">Cinema</option>
                    </select>
                  </div>
                </div>

                {/* Prompt para geração de vídeo */}
                <div className="mt-4 space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Descrição do vídeo (prompt)
                  </label>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ex.: Close em bolo japonês sendo cortado em câmera lenta, vapor saindo, foco na textura macia, iluminação quente, estilo cinema..."
                      className="h-40 w-full resize-none bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    />
                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 px-3 py-2">
                      <div className="text-[11px] text-slate-500">
                        {prompt.trim().length === 0 ? (
                          <span>
                            Descreva a cena, movimento de câmera, estilo e
                            clima do vídeo.
                          </span>
                        ) : (
                          <span>
                            {prompt.trim().length} caracteres • {duration}s •{" "}
                            {aspectRatio} • {resolution}
                            {imageFile && " • com imagem base"}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className={[
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
                          isGenerating || !prompt.trim()
                            ? "cursor-not-allowed bg-slate-800 text-slate-500"
                            : "bg-purple-500 text-slate-50 shadow-[0_0_25px_rgba(168,85,247,0.85)] hover:bg-purple-400",
                        ].join(" ")}
                      >
                        <FilmStripIcon className="h-4 w-4" />
                        {isGenerating ? "Gerando vídeo..." : "Gerar vídeo"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info do modelo atual */}
                {currentModel && (
                  <p className="mt-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">
                      Modelo selecionado:
                    </span>{" "}
                    {currentModel.name} — {currentModel.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Coluna direita: vídeos gerados */}
          <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Vídeos gerados
                </h3>
                <p className="text-xs text-slate-500">
                  Histórico dos vídeos criados com IA.HIVE Vídeo.
                </p>
              </div>
            </div>

            {!hasVideos && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/80 px-4 py-8 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/40">
                  <Video className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-100">
                    Nenhum vídeo gerado ainda
                  </p>
                  <p className="text-xs text-slate-500">
                    Use um preset rápido, envie uma imagem ou configure
                    manualmente e clique em{" "}
                    <span className="font-semibold">Gerar vídeo</span> para ver
                    seus resultados aqui.
                  </p>
                </div>
              </div>
            )}

            {hasVideos && (
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 pt-1">
                {videos.map((videoItem) => {
                  const model = VIDEO_MODELS.find(
                    (m) => m.id === videoItem.modelId
                  );
                  const minutes = Math.floor(videoItem.durationSeconds / 60);
                  const seconds = videoItem.durationSeconds % 60;

                  return (
                    <div
                      key={videoItem.id}
                      className="group flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-sm transition hover:border-purple-500/60 hover:bg-slate-900"
                    >
                      {/* Thumb: se tiver imagem base, mostra, senão gradient fake */}
                      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-purple-500/30 via-slate-900 to-slate-950">
                        {videoItem.imagePreviewUrl ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={videoItem.imagePreviewUrl}
                              alt="Imagem base do vídeo"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-950/35" />
                          </>
                        ) : (
                          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_top,rgba(248,250,252,0.85),transparent_55%)]" />
                        )}

                        <div className="relative flex h-full w-full items-center justify-center">
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-slate-50 shadow-lg ring-1 ring-slate-700/80"
                            title="Reproduzir (placeholder)"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-1 left-1 rounded-full bg-slate-950/85 px-2 py-0.5 text-[9px] font-medium text-slate-100">
                          {videoItem.aspectRatio} • {videoItem.resolution}
                        </div>
                        {videoItem.hasImageBase && (
                          <div className="absolute top-1 right-1 rounded-full bg-purple-500/80 px-2 py-0.5 text-[9px] font-semibold text-slate-950">
                            Imagem + prompt
                          </div>
                        )}
                      </div>

                      {/* Infos */}
                      <div className="flex flex-1 flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-100">
                            {model?.name ?? "Modelo de vídeo"}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            {videoItem.createdAt.toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-slate-300">
                          {videoItem.prompt}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          {minutes > 0 && `${minutes}min `}
                          {seconds.toString().padStart(2, "0")}s •{" "}
                          {videoItem.aspectRatio} • {videoItem.resolution} •{" "}
                          {labelQuality(videoItem.quality)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-100 transition hover:border-purple-400 hover:bg-purple-500/20"
                          >
                            <Play className="h-3 w-3" />
                            Prévia
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function labelQuality(value: string) {
  switch (value) {
    case "rascunho":
      return "Rascunho (teste rápido)";
    case "cinema":
      return "Cinema";
    default:
      return "Qualidade padrão";
  }
}

function FilmStripIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={["h-4 w-4", props.className].filter(Boolean).join(" ")}
    >
      <rect
        x="4"
        y="6"
        width="24"
        height="20"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="10"
        y="11"
        width="12"
        height="10"
        rx="1"
        ry="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* furos da película */}
      <circle cx="7" cy="9" r="1" fill="currentColor" />
      <circle cx="7" cy="15" r="1" fill="currentColor" />
      <circle cx="7" cy="21" r="1" fill="currentColor" />
      <circle cx="25" cy="9" r="1" fill="currentColor" />
      <circle cx="25" cy="15" r="1" fill="currentColor" />
      <circle cx="25" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

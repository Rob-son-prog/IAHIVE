"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Download, Sparkles } from "lucide-react";

import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";
import ImageLoading from "@/components/loading/ImageLoading"; // ⬅️ ADICIONADO

type AudioProvider = "elevenlabs" | "openai" | "google";

type AudioModel = {
  id: string;
  name: string;
  description: string;
  provider: AudioProvider;
  badge?: "Recomendado" | "Rápido" | "Premium";
};

const AUDIO_MODELS: AudioModel[] = [
  {
    id: "elevenlabs-premium",
    name: "ElevenLabs Premium",
    description: "Voz realista premium com suporte a clonagem de voz.",
    provider: "elevenlabs",
    badge: "Premium",
  },
  {
    id: "openai-tts",
    name: "OpenAI TTS (Neural)",
    description: "Voz neural multilíngue, ideal para narrativas gerais.",
    provider: "openai",
    badge: "Recomendado",
  },
  {
    id: "google-cloud-tts",
    name: "Google Cloud TTS",
    description: "Voz escalável e confiável para uso intensivo em produção.",
    provider: "google",
    badge: "Rápido",
  },
];

type VoiceConfig = {
  modelId: string;
  language: string;
  voiceStyle: string;
  voiceGender: string;
  speed: number;
};

type VoicePreset = {
  id: string;
  label: string;
  description: string;
  config: VoiceConfig;
};

const VOICE_PRESETS: VoicePreset[] = [
  {
    id: "vsl-feminina",
    label: "Voz feminina para VSL",
    description: "Tom dinâmico, ideal para vídeos de vendas.",
    config: {
      modelId: "elevenlabs-premium",
      language: "pt-BR",
      voiceStyle: "dinamico",
      voiceGender: "feminino",
      speed: 1.05,
    },
  },
  {
    id: "narrador-aulas",
    label: "Narrador calmo (aulas)",
    description: "Ritmo mais lento e neutro para cursos.",
    config: {
      modelId: "openai-tts",
      language: "pt-BR",
      voiceStyle: "calmo",
      voiceGender: "neutro",
      speed: 0.95,
    },
  },
  {
    id: "atendimento-sistema",
    label: "Atendimento neutro (sistema)",
    description: "Tom conversacional para atendimento automatizado.",
    config: {
      modelId: "google-cloud-tts",
      language: "pt-BR",
      voiceStyle: "conversacional",
      voiceGender: "neutro",
      speed: 1,
    },
  },
];

type GeneratedAudio = {
  id: string;
  text: string;
  modelId: string;
  provider: AudioProvider;
  createdAt: Date;
  durationSeconds: number;
  language: string;
  voiceStyle: string;
  voiceGender: string;
  speed: number;
};

export default function AudioPortalPage() {
  const [selectedModel, setSelectedModel] = useState<string>(
    AUDIO_MODELS[0]?.id ?? ""
  );
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("pt-BR");
  const [voiceStyle, setVoiceStyle] = useState("neutro");
  const [voiceGender, setVoiceGender] = useState("feminino");
  const [speed, setSpeed] = useState(1);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audios, setAudios] = useState<GeneratedAudio[]>([]);

  const handleApplyPreset = (preset: VoicePreset) => {
    setSelectedModel(preset.config.modelId);
    setLanguage(preset.config.language);
    setVoiceStyle(preset.config.voiceStyle);
    setVoiceGender(preset.config.voiceGender);
    setSpeed(preset.config.speed);
    setActivePresetId(preset.id);
  };

  const handleGenerate = () => {
    if (!text.trim() || !selectedModel) return;

    const model = AUDIO_MODELS.find((m) => m.id === selectedModel);
    if (!model) return;

    setIsGenerating(true);

    // Simulação de geração de áudio (backend virá depois)
    setTimeout(() => {
      const newAudio: GeneratedAudio = {
        id: crypto.randomUUID(),
        text: text.trim(),
        modelId: selectedModel,
        provider: model.provider,
        createdAt: new Date(),
        durationSeconds: Math.max(10, Math.min(120, text.trim().length / 4)),
        language,
        voiceStyle,
        voiceGender,
        speed,
      };

      setAudios((prev) => [newAudio, ...prev]);
      setIsGenerating(false);
    }, 600);
  };

  const hasAudios = audios.length > 0;

  const currentModel = AUDIO_MODELS.find((m) => m.id === selectedModel);

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
                IA.HIVE Áudio
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-purple-200">
                  <Sparkles className="h-3 w-3" />
                  Beta
                </span>
              </h1>
              <p className="text-xs text-slate-400 md:text-sm">
                Gere narrações profissionais, vozes naturais e trilhas de voz a
                partir de texto.
              </p>
            </div>
          </div>

          {/* CreditBar já usada nos outros portais */}
          <div className="w-full md:w-auto">
            <CreditBar
              credits={userMock.credits}
              usageThisMonth={userMock.usageThisMonth}
            />
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Card principal de geração de áudio */}
          <section className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-b from-purple-500/10 via-slate-950 to-slate-950 p-4 shadow-[0_0_40px_rgba(168,85,247,0.35)] md:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(168,85,247,0.65),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_55%)]" />

              <div className="relative space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-200/80">
                    Gerador de voz
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-50 md:text-2xl">
                    Transforme seu texto em narrações com voz realista
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Escolha um modelo de áudio, use um preset pronto ou ajuste
                    voz, idioma, gênero e velocidade para o seu projeto.
                  </p>
                </div>

                {/* Presets rápidos */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Presets rápidos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {VOICE_PRESETS.map((preset) => {
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
                            {preset.id === "vsl-feminina" && (
                              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[9px] font-semibold text-purple-100">
                                VSL
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

                {/* Seletor de modelo de áudio */}
                <div className="mt-2 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Modelo de áudio
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {AUDIO_MODELS.map((model) => {
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
                            {model.name
                              .split(" ")
                              .map((p) => p[0])
                              .join("")
                              .slice(0, 3)
                              .toUpperCase()}
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

                {/* Controles básicos de voz */}
                <div className="mt-3 grid gap-3 text-xs text-slate-200 md:grid-cols-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Idioma
                    </label>
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">Inglês (US)</option>
                      <option value="es-ES">Espanhol</option>
                      <option value="fr-FR">Francês</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Estilo de voz
                    </label>
                    <select
                      value={voiceStyle}
                      onChange={(e) => {
                        setVoiceStyle(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="neutro">Neutro profissional</option>
                      <option value="calmo">Calmo / narrador</option>
                      <option value="dinamico">Dinâmico / anúncio</option>
                      <option value="conversacional">Conversacional</option>
                    </select>
                  </div>

                  {/* Gênero da voz */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Gênero da voz
                    </label>
                    <select
                      value={voiceGender}
                      onChange={(e) => {
                        setVoiceGender(e.target.value);
                        setActivePresetId(null);
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="feminino">Feminino</option>
                      <option value="masculino">Masculino</option>
                      <option value="neutro">Neutro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                      Velocidade
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0.5}
                        max={1.5}
                        step={0.05}
                        value={speed}
                        onChange={(e) => {
                          setSpeed(parseFloat(e.target.value));
                          setActivePresetId(null);
                        }}
                        className="flex-1 accent-purple-500"
                      />
                      <span className="w-10 text-right text-[11px] text-slate-200">
                        {speed.toFixed(2)}x
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caixa de texto para narrar */}
                <div className="mt-4 space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Texto para narração
                  </label>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Descreva aqui o texto que você quer transformar em áudio. Exemplo: abertura de VSL, introdução de vídeo, aula ou vinheta para podcast..."
                      className="h-40 w-full resize-none bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    />
                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 px-3 py-2">
                      <div className="text-[11px] text-slate-500">
                        {text.trim().length === 0 ? (
                          <span>Pronto para gerar sua primeira narração.</span>
                        ) : (
                          <span>
                            {text.trim().length} caracteres • estimativa ~
                            {Math.max(
                              5,
                              Math.round(text.trim().length / 14)
                            )}{" "}
                            segundos
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating || !text.trim()}
                        className={[
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
                          isGenerating || !text.trim()
                            ? "cursor-not-allowed bg-slate-800 text-slate-500"
                            : "bg-purple-500 text-slate-50 shadow-[0_0_25px_rgba(168,85,247,0.85)] hover:bg-purple-400",
                        ].join(" ")}
                      >
                        <WaveformIcon className="h-4 w-4" />
                        {isGenerating ? "Gerando áudio..." : "Gerar áudio"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info do modelo atual (pequeno resumo) */}
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

          {/* Coluna direita: lista de áudios gerados */}
          <section className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Áudios gerados
                </h3>
                <p className="text-xs text-slate-500">
                  Histórico das suas narrações geradas com IA.HIVE Áudio.
                </p>
              </div>
            </div>

            {/* Estado vazio: nenhum áudio e não está gerando */}
            {!hasAudios && !isGenerating && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/80 px-4 py-8 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/40">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-100">
                    Nenhum áudio gerado ainda
                  </p>
                  <p className="text-xs text-slate-500">
                    Escreva um texto no card ao lado e clique em{" "}
                    <span className="font-semibold">Gerar áudio</span> para ver
                    suas narrações aparecerem aqui.
                  </p>
                </div>
              </div>
            )}

            {/* Primeiro áudio sendo gerado (sem histórico ainda) */}
            {!hasAudios && isGenerating && (
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-6">
                  <ImageLoading />
                </div>
              </div>
            )}

            {/* Já tem histórico de áudios */}
            {hasAudios && (
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 pt-1">
                {/* Spinner no topo da lista enquanto gera novo áudio */}
                {isGenerating && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                    <ImageLoading />
                  </div>
                )}

                {audios.map((audio) => {
                  const model = AUDIO_MODELS.find(
                    (m) => m.id === audio.modelId
                  );
                  const minutes = Math.floor(audio.durationSeconds / 60);
                  const seconds = audio.durationSeconds % 60;

                  return (
                    <div
                      key={audio.id}
                      className="group rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-sm transition hover:border-purple-500/60 hover:bg-slate-900"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-1 flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-100">
                              {model?.name ?? "Modelo de áudio"}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                              {audio.createdAt.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-xs text-slate-300">
                            {audio.text}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            {minutes > 0 && `${minutes}min `}
                            {seconds.toString().padStart(2, "0")}s •{" "}
                            {audio.language} • {audio.voiceStyle} •{" "}
                            {audio.voiceGender} • {audio.speed.toFixed(2)}x
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 transition hover:border-purple-400 hover:bg-purple-500/20"
                            title="Reproduzir (placeholder)"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                            title="Download (placeholder)"
                          >
                            <Download className="h-4 w-4" />
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

function WaveformIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={["h-4 w-4", props.className].filter(Boolean).join(" ")}
    >
      <path
        d="M4 18.5V13.5C4 12.67 4.67 12 5.5 12C6.33 12 7 12.67 7 13.5V18.5C7 19.33 6.33 20 5.5 20C4.67 20 4 19.33 4 18.5ZM10 22.5V9.5C10 8.67 10.67 8 11.5 8C12.33 8 13 8.67 13 9.5V22.5C13 23.33 12.33 24 11.5 24C10.67 24 10 23.33 10 22.5ZM16 24.5V7.5C16 6.67 16.67 6 17.5 6C18.33 6 19 6.67 19 7.5V24.5C19 25.33 18.33 26 17.5 26C16.67 26 16 25.33 16 24.5ZM22 21.5V10.5C22 9.67 22.67 9 23.5 9C24.33 9 25 9.67 25 10.5V21.5C25 22.33 24.33 23 23.5 23C22.67 23 22 22.33 22 21.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

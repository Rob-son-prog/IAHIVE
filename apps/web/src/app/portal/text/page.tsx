"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";

import ModelPicker, {
  ModelInfo,
} from "../../../components/portal/ModelPicker";
import TextBox from "../../../components/portal/TextBox";
import MessageBubble from "@/components/MessageBubble";
import CreditBar from "../../../components/portal/CreditBar";
import { userMock } from "../../../data/portal-mock";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type SelectedModel = {
  id: string;
  label: string;
  logoSrc?: string;
};

// mapa opcional de logos por modelo (usando arquivos em public/models)
const MODEL_LOGOS: Record<string, string> = {
  "gpt-4o": "/models/gpt-4o.svg",
  // depois você pode ir colocando as demais:
  // "gemini-1.5-pro": "/models/gemini-1.5-pro.svg",
  // "claude-3-opus": "/models/claude-3-opus.svg",
};


// modelos de TEXTO
// modelos de TEXTO
const TEXT_MODELS: ModelInfo[] = [
  {
    id: "gpt-4o",
    name: "OpenAI GPT-4o",
    subtitle: "Equilíbrio entre qualidade e custo",
  },
  {
    id: "gpt-5",
    name: "OpenAI GPT-5",
    subtitle: "Máxima capacidade e qualidade",
  },
  {
    id: "claude-3-opus",
    name: "Anthropic (Claude 3 Opus)",
    subtitle: "Raciocínio avançado e consistente",
  },
  {
    id: "gemini-1.5-pro",
    name: "Google (Gemini 1.5 Pro)",
    subtitle: "Contexto longo e boa integração com Google",
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    subtitle: "Modelo europeu, rápido e eficiente",
  },
  {
    id: "groq-llama3",
    name: "Groq (Llama 3)",
    subtitle: "Baixa latência com hardware Groq",
  },
  {
    id: "cohere-command-r-plus",
    name: "Cohere (Command R+)",
    subtitle: "Focado em tarefas corporativas e RAG",
  },
  {
    id: "perplexity-pplx-online",
    name: "Perplexity (pplx-online)",
    subtitle: "Busca em tempo real combinada com IA",
  },
];


/// cabeçalho reaproveitado nos dois estados
function TextHeader() {
  return (
    <header className="mt-4 w-full">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-3">
          {/* Botão Voltar, pequeno e minimalista */}
          <div className="flex justify-start">
            <Link href="/portal">
              <Button
                variant="outline"
                className="flex items-center gap-1 rounded-full border-border/50 bg-transparent px-3 py-1 text-xs font-normal text-muted-foreground hover:bg-white/5"
              >
                <ArrowLeft className="h-3 w-3" />
                Voltar
              </Button>
            </Link>
          </div>

          {/* Barra de créditos abaixo do botão */}
          <CreditBar
            credits={userMock.credits}
            usageThisMonth={userMock.usageThisMonth}
          />
        </div>
      </div>
    </header>
  );
}

export default function TextPortalPage() {
  const [pickerOpen, setPickerOpen] = useState(false);

  const [selectedModel, setSelectedModel] = useState<SelectedModel>({
    id: TEXT_MODELS[0].id,
    label: TEXT_MODELS[0].name,
  });

  const [messages, setMessages] = useState<Msg[]>([]);

  const hasMessages = messages.length > 0;

  // ref para auto-scroll das mensagens
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const modelName = selectedModel?.label || selectedModel?.id || "Modelo";

    setTimeout(() => {
      const mock: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Esta é uma resposta simulada do ${modelName}. Em breve conectaremos ao backend para gerar respostas reais com o modelo selecionado.`,
      };
      setMessages((prev) => [...prev, mock]);
    }, 450);
  };

  const resolvedLogo =
  selectedModel.logoSrc ||
  MODEL_LOGOS[selectedModel.id] ||
  `/models/${selectedModel.id.replace(/[^\w-]/g, "").toLowerCase()}.svg`;


  /* ─────────────────────────────
     ESTADO 1: tela limpa (sem mensagens)
     ───────────────────────────── */
  if (!hasMessages) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground">
        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8 gap-6">
          <TextHeader />

          {/* título central */}
          <section className="flex flex-col items-center text-center gap-2 mt-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary">
              Olá, robson.
            </h1>
          </section>

          {/* card com glow no meio (NÃO MEXEMOS) */}
          <section className="mt-6 w-full max-w-3xl self-center">
            <div className="rounded-[2.5rem] border border-border/60 bg-card/90 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
                <span>Peça ao IA.HIVE</span>

                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs sm:text-sm hover:bg-background"
                >
                  <span className="relative h-5 w-5 overflow-hidden rounded-full bg-card">
                    <Image
                      src={resolvedLogo}
                      alt={selectedModel.label}
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span className="font-medium">{selectedModel.label}</span>
                  <span className="text-[10px] text-muted-foreground">▼</span>
                </button>

                <ModelPicker
                  open={pickerOpen}
                  value={selectedModel.id}
                  onClose={() => setPickerOpen(false)}
                  onSelect={(id: string) => {
                    const found = TEXT_MODELS.find((m) => m.id === id);
                    setSelectedModel({
                      id,
                      label: found?.name ?? id,
                    });
                    setPickerOpen(false);
                  }}
                  models={TEXT_MODELS}
                />
              </div>

              <TextBox
                placeholder="Digite sua mensagem…"
                onSubmit={handleSend}
                ctaIcon={<Send className="h-4 w-4" />}
              />
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              O IA.HIVE pode cometer erros. Revise as respostas. Use Enter para
              enviar e Shift + Enter para quebrar a linha.
            </p>
          </section>
        </main>
      </div>
    );
  }

  /* ─────────────────────────────
     ESTADO 2: com mensagens
     (card fixo embaixo, só mensagens rolam)
     ───────────────────────────── */
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8 gap-4">
        <TextHeader />

        {/* título */}
        <section className="flex flex-col items-center text-center gap-1 mt-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
            Olá, robson.
          </h1>
        </section>

        {/* mensagens: área rolável */}
        <section className="mt-2 flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))}
          <div ref={bottomRef} />
        </section>

        {/* card fixo próximo ao rodapé (NÃO MEXEMOS) */}
        <section className="w-full max-w-3xl self-center pb-2">
          <div className="rounded-[2.5rem] border border-border/60 bg-card/90 px-4 py-4 sm:px-6 sm:py-5 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
            <div className="mb-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
              <span>Peça ao IA.HIVE</span>

              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs sm:text-sm hover:bg-background"
              >
                <span className="relative h-5 w-5 overflow-hidden rounded-full bg-card">
                  <Image
                    src={resolvedLogo}
                    alt={selectedModel.label}
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="font-medium">{selectedModel.label}</span>
                <span className="text-[10px] text-muted-foreground">▼</span>
              </button>

              <ModelPicker
                open={pickerOpen}
                value={selectedModel.id}
                onClose={() => setPickerOpen(false)}
                onSelect={(id: string) => {
                  const found = TEXT_MODELS.find((m) => m.id === id);
                  setSelectedModel({
                    id,
                    label: found?.name ?? id,
                  });
                  setPickerOpen(false);
                }}
                models={TEXT_MODELS}
              />
            </div>

            <TextBox
              placeholder="Digite sua mensagem…"
              onSubmit={handleSend}
              ctaIcon={<Send className="h-4 w-4" />}
            />
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            O IA.HIVE pode cometer erros. Revise as respostas. Use Enter para
            enviar e Shift + Enter para quebrar a linha.
          </p>
        </section>
      </main>
    </div>
  );
}

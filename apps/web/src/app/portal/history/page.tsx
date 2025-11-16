"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Image as ImageIcon,
  Type,
  Mic2,
  Clapperboard,
  Wallet,
} from "lucide-react";

import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";

type OperationType = "recharge" | "image" | "text" | "audio" | "video";

type Operation = {
  id: string;
  date: string; // ISO
  description: string;
  type: OperationType;
  credits: number; // positivo = recarga, negativo = consumo
  valueBRL?: number | null;
  method?: string; // ex.: PIX, Cartão, IA usada etc.
};

// 🔹 Mock provisório (depois você troca pelos dados do backend)
const MOCK_HISTORY: Operation[] = [
  {
    id: "op-1",
    date: "2025-11-10T09:12:00",
    description: "Recarga via PIX",
    type: "recharge",
    credits: 240,
    valueBRL: 120,
    method: "PIX",
  },
  {
    id: "op-2",
    date: "2025-11-10T09:18:00",
    description: "Geração de imagens (4x Ultra)",
    type: "image",
    credits: -32,
    method: "Leonardo.Ai Ultra",
  },
  {
    id: "op-3",
    date: "2025-11-10T10:02:00",
    description: "Criação de roteiro de VSL",
    type: "text",
    credits: -12,
    method: "GPT-4o",
  },
  {
    id: "op-4",
    date: "2025-11-11T14:22:00",
    description: "Narração de VSL em pt-BR",
    type: "audio",
    credits: -24,
    method: "ElevenLabs Premium",
  },
  {
    id: "op-5",
    date: "2025-11-11T16:40:00",
    description: "Vídeo curto vertical (9:16, 12s)",
    type: "video",
    credits: -28,
    method: "Runway Gen-3",
  },
  {
    id: "op-6",
    date: "2025-11-12T11:05:00",
    description: "Recarga via cartão de crédito",
    type: "recharge",
    credits: 480,
    valueBRL: 200,
    method: "Cartão de crédito",
  },
];

type Filter = "all" | OperationType;

const TYPE_LABEL: Record<OperationType, string> = {
  recharge: "Recarga",
  image: "Imagens",
  text: "Texto",
  audio: "Áudio",
  video: "Vídeo",
};

const TYPE_BADGE_CLASS: Record<OperationType, string> = {
  recharge:
    "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40",
  image: "bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/40",
  text: "bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/40",
  audio: "bg-pink-500/10 text-pink-300 ring-1 ring-pink-500/40",
  video: "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40",
};

const TYPE_ICON: Record<OperationType, JSX.Element> = {
  recharge: <Wallet className="h-4 w-4" />,
  image: <ImageIcon className="h-4 w-4" />,
  text: <Type className="h-4 w-4" />,
  audio: <Mic2 className="h-4 w-4" />,
  video: <Clapperboard className="h-4 w-4" />,
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const totalRecharge = useMemo(
    () =>
      MOCK_HISTORY.filter((op) => op.credits > 0).reduce(
        (acc, op) => acc + op.credits,
        0
      ),
    []
  );

  const totalConsumed = useMemo(
    () =>
      Math.abs(
        MOCK_HISTORY.filter((op) => op.credits < 0).reduce(
          (acc, op) => acc + op.credits,
          0
        )
      ),
    []
  );

  const filtered = useMemo(() => {
    if (filter === "all") return MOCK_HISTORY;
    return MOCK_HISTORY.filter((op) => op.type === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Topo: voltar + CreditBar */}
        <header className="flex flex-col gap-4 border-b border-border/60 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-normal text-muted-foreground hover:bg-white/5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar para o dashboard</span>
            </Link>

            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-foreground md:text-base">
                Histórico de créditos
              </h1>
              <p className="text-xs text-muted-foreground md:text-sm">
                Acompanhe recargas e consumo de créditos do IA.HIVE.
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

        {/* Cards de resumo */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/80 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Recargas totais
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300 ring-1 ring-emerald-500/40">
                <ArrowDownRight className="h-3 w-3" />
                Entrada
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {totalRecharge} créditos
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Somatório das recargas registradas neste ambiente.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Consumo total
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-300 ring-1 ring-rose-500/40">
                <ArrowUpRight className="h-3 w-3" />
                Saída
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {totalConsumed} créditos
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Uso somado em imagens, texto, áudio e vídeo.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Saldo atual
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-200 ring-1 ring-purple-500/50">
                <Clock className="h-3 w-3" />
                Agora
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {userMock.credits} créditos
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Este é o saldo visível em todos os portais de IA.
            </p>
          </div>
        </section>

        {/* Conteúdo principal: histórico + notas */}
        <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Lista de operações */}
          <div className="flex flex-col rounded-2xl border border-border bg-card/80 p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Linha do tempo de operações
                </h2>
                <p className="text-xs text-muted-foreground">
                  Veja como seus créditos foram recarregados e utilizados.
                </p>
              </div>

              {/* Filtros simples */}
              <div className="inline-flex flex-wrap gap-2 rounded-full bg-background/60 p-1">
                {[
                  { id: "all", label: "Tudo" },
                  { id: "recharge", label: "Recargas" },
                  { id: "image", label: "Imagens" },
                  { id: "text", label: "Texto" },
                  { id: "audio", label: "Áudio" },
                  { id: "video", label: "Vídeo" },
                ].map((f) => {
                  const active = filter === (f.id as Filter);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id as Filter)}
                      className={[
                        "rounded-full px-3 py-1 text-[11px] transition",
                        active
                          ? "bg-foreground text-background shadow-sm"
                          : "text-muted-foreground hover:bg-white/5",
                      ].join(" ")}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lista */}
            {filtered.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-background/60 px-4 py-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Nenhuma operação para esse filtro
                </p>
                <p className="text-xs text-muted-foreground">
                  Assim que você usar mais IAs ou fizer novas recargas, elas
                  aparecerão aqui.
                </p>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 pt-1">
                {filtered.map((op) => {
                  const isRecharge = op.type === "recharge";
                  const creditsAbs = Math.abs(op.credits);

                  return (
                    <div
                      key={op.id}
                      className="group flex gap-3 rounded-xl border border-border/80 bg-background/80 p-3 text-sm transition hover:border-purple-500/60 hover:bg-background"
                    >
                      {/* Ícone + dia */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <div
                          className={[
                            "flex h-8 w-8 items-center justify-center rounded-full text-[11px] ring-1",
                            TYPE_BADGE_CLASS[op.type],
                          ].join(" ")}
                        >
                          {TYPE_ICON[op.type]}
                        </div>
                        <span className="mt-1 text-[10px] text-muted-foreground">
                          {formatDate(op.date)}
                        </span>
                      </div>

                      {/* Detalhes */}
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold text-foreground">
                              {op.description}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {TYPE_LABEL[op.type]}
                              {op.method ? ` • ${op.method}` : ""}
                            </span>
                          </div>

                          {/* Variação de créditos */}
                          <div className="text-right text-xs">
                            <div
                              className={[
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                                isRecharge
                                  ? "bg-emerald-500/10 text-emerald-300"
                                  : "bg-rose-500/10 text-rose-300",
                              ].join(" ")}
                            >
                              {isRecharge ? (
                                <ArrowDownRight className="h-3 w-3" />
                              ) : (
                                <ArrowUpRight className="h-3 w-3" />
                              )}
                              {isRecharge ? "+" : "-"} {creditsAbs} créditos
                            </div>
                            <div className="mt-1 text-[10px] text-muted-foreground">
                              {formatTime(op.date)}
                              {op.valueBRL != null &&
                                ` • ${formatBRL(op.valueBRL)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coluna direita: notas e política */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card/80 p-4">
              <h3 className="text-sm font-semibold text-foreground">
                Como o histórico funciona
              </h3>
              <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                <li>
                  • <span className="font-medium">Recargas</span> aparecem como
                  entradas em verde, com o valor em créditos e (quando existir)
                  o valor em reais.
                </li>
                <li>
                  • Consumos em{" "}
                  <span className="font-medium">Imagem, Texto, Áudio e Vídeo</span>{" "}
                  aparecem como saídas em vermelho.
                </li>
                <li>
                  • O saldo exibido aqui é o mesmo utilizado em todos os
                  portais de IA dentro do IA.HIVE.
                </li>
                <li>
                  • Em breve este bloco será alimentado diretamente pelo seu
                  backend e pelos webhooks do checkout.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-4 text-[11px] leading-relaxed text-muted-foreground">
              <h3 className="text-xs font-semibold text-foreground">
                Garantia, reembolso e segurança
              </h3>
              <p className="mt-2">
                Pagamentos são processados com segurança via Mercado Pago. Seus
                créditos são liberados automaticamente após a confirmação do
                pagamento.
              </p>
              <p className="mt-2">
                Em caso de erro na recarga ou falha de confirmação, o saldo pode
                ser ajustado manualmente pela equipe IA.HIVE utilizando os
                registros deste histórico.
              </p>
              <p className="mt-2">
                Reembolsos podem ser concedidos enquanto os créditos
                correspondentes não forem utilizados, seguindo a política
                comercial que você definir para o seu SaaS.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

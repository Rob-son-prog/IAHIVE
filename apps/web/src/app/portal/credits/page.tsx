"use client";

import Link from "next/link";
import { Sparkles, Zap, ArrowLeft, Shield, Clock, BarChart3 } from "lucide-react";
import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";

type CreditPack = {
  id: string;
  label: string;
  credits: number;
  price: number;
  highlight?: "best" | "starter";
  description: string;
  recommendedFor: string;
};

const CREDIT_PACKS: CreditPack[] = [
  {
    id: "starter",
    label: "Starter",
    credits: 120,
    price: 29,
    highlight: "starter",
    description: "Perfeito para testar imagens, texto e alguns áudios.",
    recommendedFor: "Testes, freelancers e pequenos projetos."
  },
  {
    id: "pro",
    label: "Pro",
    credits: 480,
    price: 79,
    highlight: "best",
    description: "Crie campanhas completas com IA de imagem, texto, áudio e vídeo.",
    recommendedFor: "Tráfego pago, lançamentos e produção recorrente."
  },
  {
    id: "scale",
    label: "Scale",
    credits: 1200,
    price: 149,
    description: "Pacote para operação rodando com IA todos os dias.",
    recommendedFor: "Agências, infoprodutores e squads internos."
  }
];

export default function CreditsPage() {
  const { credits, usageThisMonth } = userMock;

  const usedPercent = Math.min(
    100,
    Math.round((usageThisMonth / (credits + usageThisMonth || 1)) * 100)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Topo: voltar + título + barra de créditos */}
        <header className="flex flex-col gap-4 border-b border-border/60 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-card/90"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Voltar para o dashboard</span>
            </Link>

            <div className="flex flex-col">
              <h1 className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                Créditos e recarga
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-purple-300">
                  <Sparkles className="h-3 w-3" />
                  Pré-pago flex
                </span>
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Acompanhe seu saldo, uso mensal e recarregue quando precisar.
              </p>
            </div>
          </div>

          <div className="w-full md:w-[320px]">
            <CreditBar credits={credits} usageThisMonth={usageThisMonth} />
          </div>
        </header>

        {/* Layout principal: lado esquerdo pacotes / lado direito resumo */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Pacotes de crédito */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold sm:text-base">
                  Escolha um pacote de créditos
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Modelo <b>pré-pago</b>: você só paga quando precisa. Sem mensalidade obrigatória.
                </p>
              </div>
              <div className="hidden text-[11px] text-muted-foreground md:block">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <Shield className="h-3 w-3" />
                  Cobrança segura
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {CREDIT_PACKS.map((pack) => {
                const isBest = pack.highlight === "best";
                const isStarter = pack.highlight === "starter";

                return (
                  <div
                    key={pack.id}
                    className={[
                      "relative flex h-full flex-col rounded-2xl border bg-card/80 p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
                      isBest
                        ? "border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.55)]"
                        : "border-border/70"
                    ].join(" ")}
                  >
                    {isBest && (
                      <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-purple-500 text-[10px] font-semibold uppercase tracking-wide text-white px-2 py-0.5 shadow-lg">
                        <Zap className="h-3 w-3" />
                        Mais usado
                      </div>
                    )}
                    {isStarter && !isBest && (
                      <div className="absolute right-3 top-3 rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                        Para começar
                      </div>
                    )}

                    <div className="mb-2">
                      <h3 className="text-sm font-semibold">{pack.label}</h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {pack.description}
                      </p>
                    </div>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold">
                        {pack.credits}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        créditos
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      R$ {pack.price.toFixed(2).replace(".", ",")}{" "}
                      <span className="text-[11px] text-muted-foreground/80">
                        • ~ R${" "}
                        {(pack.price / pack.credits).toFixed(2).replace(".", ",")}{" "}
                        por crédito
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-[11px] text-muted-foreground">
                      {pack.recommendedFor}
                    </p>

                    <button
                      type="button"
                      disabled
                      className={[
                        "mt-4 inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em]",
                        "cursor-not-allowed opacity-70",
                        isBest
                          ? "bg-purple-500 text-white"
                          : "bg-muted text-foreground"
                      ].join(" ")}
                    >
                      Em breve: recarga via checkout
                    </button>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Integração com gateway de pagamento será conectada na etapa
                      de backend.
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Como o crédito é consumido */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 text-xs sm:text-sm">
              <div className="mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                <h3 className="text-sm font-semibold">Como os créditos são consumidos</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Imagens
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Consumo varia por modelo, resolução e modo (Fast / Ultra).
                    Ideal para criativos, thumbs, artes e logos.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Texto
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Gasto baseado em tokens. Ótimo para roteiros, copies, e-mails
                    e planejamento de campanhas.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Áudio &amp; Vídeo
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Consumo proporcional à duração do áudio/vídeo gerado e ao
                    modelo utilizado (premium ou padrão).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita: status e dicas */}
          <aside className="space-y-4">
            {/* Card de status atual */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-500/15 via-background to-background p-4 shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_top,rgba(168,85,247,0.7),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_55%)]" />
              <div className="relative space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-200">
                  Status da conta
                </p>
                <p className="text-sm">
                  Você tem{" "}
                  <span className="font-semibold text-purple-100">
                    {credits} créditos
                  </span>{" "}
                  disponíveis.
                </p>
                <p className="text-xs text-purple-100/80">
                  Neste mês você já consumiu{" "}
                  <b>{usageThisMonth} créditos</b>, o que representa
                  aproximadamente{" "}
                  <b>{usedPercent}%</b> do seu uso médio.
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full bg-purple-400"
                    style={{ width: `${Math.min(usedPercent, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-purple-100/70">
                  Quando os créditos chegarem perto de zero, você poderá
                  recarregar aqui mesmo — sem bloquear o acesso ao portal.
                </p>
              </div>
            </div>

            {/* Card de política / segurança */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 text-xs sm:text-sm">
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold">Política de uso justo</h3>
              </div>
              <ul className="space-y-2 text-[12px] text-muted-foreground">
                <li>
                  • Créditos não expiram rápido — a ideia é ser um{" "}
                  <b>saldo pré-pago flexível</b> para você usar no seu ritmo.
                </li>
                <li>
                  • Se houver uso anormal (bots externos ou abuso), o sistema
                  poderá pausar temporariamente para proteger sua conta.
                </li>
                <li>
                  • Em breve você verá um <b>histórico detalhado</b> de consumo
                  por projeto, modelo e tipo de IA.
                </li>
              </ul>
            </div>

            {/* Card de resumo operacional */}
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4 text-xs sm:text-sm">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400" />
                <h3 className="text-sm font-semibold">Próximos passos</h3>
              </div>
              <p className="mb-2 text-[12px] text-muted-foreground">
                Essa tela já está pronta para receber a integração com o
                backend e o checkout (Mercado Pago, Stripe, etc).
              </p>
              <ul className="space-y-1.5 text-[12px] text-muted-foreground">
                <li>1. Conectar API de pagamento ao backend (`apps/api`).</li>
                <li>2. Criar endpoint de criação de pedido / recarga.</li>
                <li>3. Atualizar saldo de créditos no banco após pagamento.</li>
                <li>4. Exibir histórico de recarga aqui na coluna da direita.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

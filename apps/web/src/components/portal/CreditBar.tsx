"use client";

import React, { useState } from "react";
import RechargeDialog from "@/components/portal/RechargeDialog";


type Props = {
  credits: number;
  usageThisMonth: number;
};

export default function CreditBar({ credits, usageThisMonth }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(50);

  // meta mínima só para preencher a barra
  const monthlyGoal = Math.max(usageThisMonth, 200);
  const pct = Math.min(100, Math.round((usageThisMonth / monthlyGoal) * 100));

  // estimativa simples: R$ 1 => 1 crédito (ajuste depois se for diferente)
  const estimatedCredits = Math.max(0, Math.round(amount));

  return (
    <>
      {/* CARD DE CRÉDITOS */}
      <div className="rounded-2xl border border-border bg-card p-4 text-foreground">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted">Saldo disponível</p>
            <div className="mt-1 inline-flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{credits}</span>
              <span className="text-sm text-muted">créditos</span>
            </div>
          </div>

          <div className="mt-2 inline-flex items-center gap-2 md:mt-0">
            <button
  type="button"
  onClick={() => setOpen(true)}
  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-white
             bg-gradient-to-r from-indigo-400 to-fuchsia-500 shadow-sm transition
             hover:shadow-md hover:brightness-110 active:scale-[0.98] focus:outline-none
             focus-visible:ring-2 focus-visible:ring-fuchsia-400/70"
  aria-label="Abrir recarga de créditos"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" stroke="currentColor" className="text-white/90" />
    <rect x="3" y="9" width="18" height="2" fill="currentColor" className="text-white/90" />
  </svg>
  <span>Recarga</span>
</button>


            <span className="rounded-full border border-border px-3 py-1 text-xs">
              Uso do mês: {usageThisMonth}
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.10)]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, rgba(34,197,94,0.65), rgba(168,85,247,0.65))",
            }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-muted">
          {pct}% da meta mensal
        </div>
      </div>

      {/* MODAL – PRÉ-PAGO FLEX + PACOTES PRONTOS */}
      <RechargeDialog open={open} onOpenChange={setOpen} />
{false && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative z-10 w-[94vw] max-w-5xl rounded-2xl border border-border bg-card p-5 text-foreground shadow-2xl">
            {/* topo / fechar */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Pré-pago Flex</h2>
                <span className="rounded-full border border-fuchsia-400/40 px-2 py-[2px] text-[11px] text-fuchsia-200/90">
                  Recomendado
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="rounded-md border border-border px-2 py-1 text-xs transition hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* grade 2 colunas */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* COLUNA ESQUERDA – VALOR LIVRE */}
              <div className="rounded-2xl border border-border bg-background/40 p-4">
                <div className="mb-1 text-3xl font-extrabold leading-tight">
                  Valor livre
                </div>
                <div className="mb-4 text-sm text-muted">mínimo R$ 9,90</div>

                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="mb-2 text-sm text-muted">
                    Escolha quanto recarregar
                  </div>

                  {/* entrada + chips */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex w-full items-center rounded-xl border border-border bg-background px-3">
                      <span className="mr-2 text-sm text-muted">R$</span>
                      <input
                        type="number"
                        min={10}
                        step={10}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value || 0))}
                        className="w-full bg-transparent py-2 text-sm outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {[50, 100, 250].map((v) => {
                        const active = amount === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setAmount(v)}
                            className={[
                              "rounded-lg border px-3 py-1.5 text-xs transition",
                              active
                                ? "border-fuchsia-400/70 ring-1 ring-fuchsia-400/40"
                                : "border-border hover:bg-white/5",
                            ].join(" ")}
                          >
                            R$ {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* cards resumo */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border p-3">
                      <div className="text-sm text-muted">Créditos estimados</div>
                      <div className="mt-1 text-2xl font-semibold">
                        {estimatedCredits} créditos
                      </div>
                    </div>
                    <div className="rounded-xl border border-border p-3">
                      <div className="text-sm text-muted">Taxa de manutenção</div>
                      <div className="mt-1 text-2xl font-semibold">R$ 0,00</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => {
                    // TODO: integrar cobrança
                    setOpen(false);
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(168,85,247,1) 100%)",
                  }}
                >
                  {/* Ícone de cartão simples */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="-mt-[2px]"
                  >
                    <rect
                      x="2.5"
                      y="5.5"
                      width="19"
                      height="13"
                      rx="2.5"
                      stroke="currentColor"
                    />
                    <rect x="3" y="9" width="18" height="2" fill="currentColor" />
                  </svg>
                  Recarregar agora
                </button>

                <p className="mt-3 text-xs text-muted">
                  Pagamento seguro. Reembolso em até 7 dias se os créditos não forem
                  utilizados.
                </p>
              </div>

              {/* COLUNA DIREITA – PACOTES PRONTOS */}
              <div className="rounded-2xl border border-border bg-background/40 p-4">
                <div className="mb-1 text-2xl font-semibold">Pacotes prontos</div>
                <div className="mb-4 text-sm text-muted">recarregue em 1 clique</div>

                <ul className="space-y-3 text-sm">
                  <li className="rounded-xl border border-border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">R$ 50</span>
                      <button
                        type="button"
                        onClick={() => setAmount(50)}
                        className="rounded-lg border border-border px-3 py-1 text-xs transition hover:bg-white/5"
                      >
                        Selecionar
                      </button>
                    </div>
                    <p className="text-muted">
                      excelente para começar e testar fluxos reais.
                    </p>
                  </li>

                  <li className="rounded-xl border border-border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">R$ 100</span>
                      <button
                        type="button"
                        onClick={() => setAmount(100)}
                        className="rounded-lg border border-border px-3 py-1 text-xs transition hover:bg-white/5"
                      >
                        Selecionar
                      </button>
                    </div>
                    <p className="text-muted">
                      ideal para experimentos mais longos ou dois projetos.
                    </p>
                  </li>

                  <li className="rounded-xl border border-border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">R$ 250</span>
                      <button
                        type="button"
                        onClick={() => setAmount(250)}
                        className="rounded-lg border border-border px-3 py-1 text-xs transition hover:bg-white/5"
                      >
                        Selecionar
                      </button>
                    </div>
                    <p className="text-muted">
                      para uso consistente e times pequenos.
                    </p>
                  </li>
                </ul>

                {/* CTA espelho (opcional) */}
                <button
                  type="button"
                  onClick={() => {
                    // usa o amount já selecionado
                    setOpen(false);
                  }}
                  className="mt-4 w-full rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-white/5"
                >
                  Continuar com R$ {amount}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}







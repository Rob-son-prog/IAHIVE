"use client";

import { useMemo, useState } from "react";
import { Sparkles, Check, CreditCard, MousePointerClick } from "lucide-react";

/**
 * IA.HIVE — Preços (Pré-pago)
 * - Valor livre com mínimo de R$ 9,90
 * - Acesso grátis ao portal (sem cartão)
 * - Visual moderno com glass/gradiente
 */

export default function PricingSection() {
  const [amount, setAmount] = useState<number>(50);
  const min = 9.9;

  const safeValue = useMemo(() => (isNaN(amount) ? min : Math.max(min, amount)), [amount]);
  const credits = useMemo(() => Math.floor(safeValue), [safeValue]); // ajuste a razão se necessário

  return (
    <section id="pricing" className="relative border-t border-white/10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(56,189,248,0.12), transparent 60%), radial-gradient(60% 50% at 80% 90%, rgba(139,92,246,0.12), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
            <Sparkles size={14} className="text-cyan-300" />
            <span>Pré-pago. Sem mensalidade.</span>
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Você decide quanto investir. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400">A partir de R$ 9,90.</span>
          </h2>
          <p className="mt-3 text-neutral-300">
            Recarregue créditos quando quiser e use em qualquer ferramenta do IA.HIVE. Sem planos.
            Sem fidelidade. Transparente e previsível.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-sm text-neutral-300">Acesso</div>
            <div className="mt-1 text-3xl font-semibold">R$ 0</div>
            <div className="text-sm text-neutral-400">/ sempre</div>

            <ul className="mt-5 space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> Entre no portal, crie projetos e explore os recursos — sem cartão.</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> Simule custos e entenda o fluxo antes de recarregar.</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> Documentação e exemplos para começar rápido.</li>
            </ul>

            <a href="/portal" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 font-medium text-white hover:bg-white/[0.12]">
              <MousePointerClick size={16} /> Entrar agora
            </a>
          </div>

          <div className="relative rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-6 ring-1 ring-cyan-400/20">
            <div className="absolute -top-3 right-3 rounded-full border border-white/10 bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-200">Recomendado</div>

            <div className="text-sm text-neutral-300">Pré-pago Flex</div>
            <div className="mt-1 text-3xl font-semibold">Valor livre</div>
            <div className="text-sm text-neutral-400">mínimo R$ 9,90</div>

            <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
              <label htmlFor="valor" className="text-sm text-neutral-300">Escolha quanto recarregar</label>
              <div className="mt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">R$</span>
                  <input
                    id="valor"
                    type="number"
                    min={min}
                    step="0.1"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-8 py-2 outline-none ring-0 placeholder:text-neutral-500"
                    placeholder="9,90"
                  />
                </div>
                <button onClick={() => setAmount(50)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">R$ 50</button>
                <button onClick={() => setAmount(100)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">R$ 100</button>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-neutral-300">Créditos estimados</span>
                <span className="font-medium text-white">{credits} créditos</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
                <span>Taxa de manutenção</span>
                <span>R$ 0</span>
              </div>
            </div>

            <a href="/portal" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 px-4 py-2.5 font-medium text-white hover:opacity-90">
              <CreditCard size={16} /> Recarregar agora
            </a>

            <p className="mt-3 text-xs text-neutral-400">Pagamento seguro. Reembolso em até 7 dias se os créditos não forem utilizados.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-sm text-neutral-300">Atalhos</div>
            <div className="mt-1 text-3xl font-semibold">Pacotes prontos</div>
            <div className="text-sm text-neutral-400">recarregue em 1 clique</div>

            <ul className="mt-5 space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> R$ 50 — excelente para começar e testar fluxos reais.</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> R$ 100 — ideal para experimentos mais longos ou dois projetos.</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-cyan-400" /> R$ 250 — para uso consistente e times pequenos.</li>
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {([50, 100, 250] as const).map((v) => (
                <a key={v} href="/portal" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-medium text-white hover:bg-white/10">
                  R$ {v}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-300">
            Zero mensalidade, zero fricção. Você controla o gasto, nós entregamos o poder de IA — <span className="text-white">na hora que precisar</span>.
          </p>
          <div className="text-xs text-neutral-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Acesso grátis ao portal • Sem cartão</span>
          </div>
        </div>
      </div>
    </section>
  );
}

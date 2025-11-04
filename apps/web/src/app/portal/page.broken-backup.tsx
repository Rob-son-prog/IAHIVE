"use client";

import IABox from "../../components/portal/IABox";
import CreditBar from "../../components/portal/CreditBar";
import ThemeToggle from "../../components/portal/ThemeToggle";
import { userMock } from "../../data/portal-mock";

export default function PortalHubPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      {/* Toggle de tema no topo */}
      <div className="mb-4 flex items-center justify-end">
        <ThemeToggle />
      </div>

      {/* Mostrador de créditos */}
      <CreditBar credits={userMock.credits} usageThisMonth={userMock.usageThisMonth} />

      {/* Título */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold tracking-tight">Escolha o tipo de IA</h1>
        <p className="text-sm text-neutral-400">Comece selecionando o que você quer criar agora.</p>
      </div>

      {/* Grid de IAs */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <IABox title="Imagens" desc="Gere imagens incríveis com prompt." href="/portal/image" emoji="???" />
        <IABox title="Texto"   desc="Artigos, roteiros, posts e copies." href="/portal/text"  emoji="??" />
        <IABox title="Áudio"   desc="Voz neural, TTS e narrações."      href="/portal/audio" emoji="???" />
        <IABox title="Vídeo"   desc="Clipes e storyboards com IA."      href="/portal/video" emoji="???" />
      </div>

      {/* Dica */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-4 text-sm text-neutral-300">
        Dica: você pode comprar mais créditos quando quiser — o saldo aparece sempre aqui no topo.
      </div>
    </div>
  );
}

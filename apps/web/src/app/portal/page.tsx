"use client";

import Image from "next/image";
import { Image as ImageIcon, Type as TypeIcon, Mic2, Clapperboard } from "lucide-react";
import IABox from "../../components/portal/IABox";
import CreditBar from "../../components/portal/CreditBar";
import ThemeToggle from "../../components/portal/ThemeToggle";
import { userMock } from "../../data/portal-mock";

export default function PortalHubPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      {/* Topo: logo IA.HIVE + toggle de tema */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* A PRÓPRIA IMAGEM É O CÍRCULO */}
          <Image
            src="/brand/logo04.png"
            alt="IA.HIVE"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full ring-2 ring-purple-500/60"
          />

          <span className="text-sm font-semibold tracking-tight text-neutral-100 md:text-base">
            IA.HIVE • Portal
          </span>
        </div>

        <ThemeToggle />
      </header>

      {/* Mostrador de créditos */}
      <CreditBar
        credits={userMock.credits}
        usageThisMonth={userMock.usageThisMonth}
      />

      {/* Título */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Escolha o tipo de IA
        </h1>
        <p className="text-sm text-muted">
          Comece selecionando o que você quer criar agora.
        </p>
      </div>

      {/* Grid de IAs */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <IABox
          title="Imagens"
          desc="Gere imagens incríveis com prompt."
          href="/portal/image"
          bgSrc="/portal/image-bg.svg"
          icon={<ImageIcon className="w-6 h-6" />}
        />
        <IABox
          title="Texto"
          desc="Artigos, roteiros, posts e copies."
          href="/portal/text"
          bgSrc="/portal/text-bg.svg"
          icon={<TypeIcon className="w-6 h-6" />}
        />
        <IABox
          title="Áudio"
          desc="Voz neural, TTS e narrações."
          href="/portal/audio"
          bgSrc="/portal/audio-bg.svg"
          icon={<Mic2 className="w-6 h-6" />}
        />
        <IABox
          title="Vídeo"
          desc="Clipes e storyboards com IA."
          href="/portal/video"
          bgSrc="/portal/video-bg.svg"
          icon={<Clapperboard className="w-6 h-6" />}
        />
      </div>

      {/* Dica */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-4 text-sm text-muted elev-panel">
        Dica: você pode comprar mais créditos quando quiser — o saldo aparece
        sempre aqui no topo.
      </div>
    </div>
  );
}

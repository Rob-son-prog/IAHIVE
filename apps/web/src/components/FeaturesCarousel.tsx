"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Feature = {
  tag: string;
  title: string;
  desc: string;
  gradient: string; // Tailwind gradient: from-... to-...
  img?: string;     // caminho opcional da imagem (public/*)
};

const FEATURES: Feature[] = [
  {
    tag: "Modular",
    title: "Escolha só o que precisa",
    desc: "Ferramentas avulsas, sem pacotes inflados. Monte seu stack com liberdade.",
    gradient: "from-sky-400 to-indigo-500",
    img: "/images/features/modular.svg", // sua imagem full-bleed
  },
  {
    tag: "Créditos por uso",
    title: "Transparente e previsível",
    desc: "Carregue créditos e consuma no seu ritmo. Sem mensalidades.",
    gradient: "from-emerald-400 to-teal-500",
    img: "/images/features/creditos.svg", // << adicionado
  },
  {
    tag: "Gere sua imagem ",
    title: "Infra otimizada",
    desc: "Filas e cache para respostas rápidas em texto, imagem, áudio e vídeo.",
    gradient: "from-fuchsia-400 to-violet-500",
    img: "/images/features/velocidade.svg", // << novo
  },
  {
    tag: "Áudio",
    title: "Gere seu áudio",
    desc: "Chaves, webhooks e dados sensíveis isolados no back-end.",
    gradient: "from-rose-400 to-orange-500",
    img: "/images/features/seguranca.svg", // <<
  },
  {
    tag: "Escalável",
    title: "Cresça sem dor",
    desc: "Arquitetura preparada para filas, workers e observabilidade.",
    gradient: "from-amber-400 to-pink-500",
    img: "/images/features/escalavel.webp", // << novo
  },
  {
    tag: "APIs populares",
    title: "Integrações líderes",
    desc: "As IAs mais modernas do mundo na palma da sua mão",
    gradient: "from-blue-400 to-cyan-500",
    img: "/images/features/apis-populares.png", // << novo
  },
];

function Card({ f }: { f: Feature }) {
  return (
    <div
      className="group relative w-[85vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] h-[260px] md:h-[320px] md:w-[360px]"
      data-card
    >
      {/* BACKGROUND IMAGE full-bleed (se houver) */}
      {f.img && (
        <>
          <img
            src={f.img}
            alt={f.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* overlay para leitura do texto (mais forte embaixo) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        </>
      )}

      {/* glow sutil (mantido) */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
        style={{ backgroundImage: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
      />

      {/* CONTEÚDO por cima (grudado no rodapé) */}
      <div className="relative z-10 h-full p-5 flex flex-col justify-end">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 border border-white/15">
          <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-tr ${f.gradient}`} />
          {f.tag}
        </div>

        <h3 className="mt-3 text-xl font-semibold text-white">{f.title}</h3>
        <p className="mt-2 text-sm text-neutral-200">{f.desc}</p>
      </div>

      {/* borda/hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:bg-white/[0.04]" />
    </div>
  );
}

export default function FeaturesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // AUTOPLAY no mobile (<=768px), pausa em interação/aba fora de foco
  useEffect(() => {
  const node = trackRef.current;
  if (!node) return;

  // roda também no DevTools mobile
  const isMobileWidth = () => window.innerWidth <= 768;

  let timer: number | null = null;
  let paused = false;

  const gap = 16; // gap-4

  const stepOnce = () => {
    const card = node.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth || 360) + gap;

    // se não tem overflow, não faz nada
    if (node.scrollWidth <= node.clientWidth + 2) return;

    const atEnd = Math.ceil(node.scrollLeft + node.clientWidth + 2) >= node.scrollWidth;
    if (atEnd) node.scrollTo({ left: 0, behavior: "smooth" });
    else node.scrollBy({ left: step, behavior: "smooth" });
  };

  const start = () => {
    if (!isMobileWidth() || paused) return;
    stop();
    timer = window.setInterval(stepOnce, 3000); // 3s
  };

  const stop = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  // pausa em interação do usuário
  const pause = () => { paused = true; stop(); };
  const resume = () => { paused = false; start(); };

  node.addEventListener("pointerdown", pause);
  node.addEventListener("touchstart", pause, { passive: true });
  node.addEventListener("wheel", pause, { passive: true });
  node.addEventListener("pointerup", resume);
  node.addEventListener("touchend", resume);
  node.addEventListener("mouseleave", resume);

  // pausa com aba fora de foco e reinicia ao voltar
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  // reinicia ao redimensionar (DevTools/mobile rotate)
  const onResize = () => { stop(); setTimeout(start, 150); };
  window.addEventListener("resize", onResize);

  // start inicial (e garante em Strict Mode)
  start();
  const safety = window.setTimeout(start, 200); // reforço

  return () => {
    stop();
    window.clearTimeout(safety);
    node.removeEventListener("pointerdown", pause);
    node.removeEventListener("touchstart", pause);
    node.removeEventListener("wheel", pause);
    node.removeEventListener("pointerup", resume);
    node.removeEventListener("touchend", resume);
    node.removeEventListener("mouseleave", resume);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", onResize);
  };
}, []);


  const scrollBy = (dir: "left" | "right") => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth || 360) + 16; // largura + gap
    node.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section id="features" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Por que IA.HIVE?</h2>
          <p className="mt-2 text-neutral-300 max-w-2xl">
            Plataforma moderna para tarefas específicas: geração de imagens, texto, áudio, vídeo, análise e mais.
          </p>
        </header>

        <div className="relative">
          {/* setas flutuantes */}
          <div className="pointer-events-none absolute -top-14 right-0 flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* trilho com snap */}
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2
                       [&::-webkit-scrollbar]:h-2
                       [&::-webkit-scrollbar-thumb]:rounded-full
                       [&::-webkit-scrollbar-thumb]:bg-white/10
                       [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {FEATURES.map((f, i) => (
              <Card key={i} f={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

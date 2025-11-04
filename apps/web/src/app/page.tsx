import Image from "next/image";
import PricingSection from "../components/PricingSection";
import LogoCloud from "../components/LogoCloud";
import FeaturesCarousel from "../components/FeaturesCarousel";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          {/* LOGO: imagem no lugar do texto, acessível, sem CLS */}
          <a href="/" className="group inline-flex items-center gap-3" aria-label="IA.HIVE — Home">
  <span className="relative w-auto">
    <Image
      src="/brand/logo3.png?v=4"
      alt="IA.HIVE"
      width={1100}         // reserva de espaço (mesma proporção do PNG)
      height={200}
      priority
      sizes="(max-width: 768px) 480px, 800px"
      className="h-32 md:h-40 w-auto transition-opacity duration-150 group-hover:opacity-90"
    />
  </span>
  <span className="hidden md:inline font-semibold tracking-tight">IA.HIVE</span>
</a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Recursos</a>
            <a href="#pricing" className="hover:text-white">Preços</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="/portal" className="rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5">
              Entrar no Portal
            </a>
          </nav>
          <a href="/portal" className="md:hidden rounded-lg border border-white/15 px-3 py-2 text-sm">Portal</a>
        </div>
      </header>

      {/* HERO (sem WebGL) */}
      <section id="hero" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(60%_60%_at_50%_100%,rgba(99,102,241,0.10),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-cyan-300/90">Ferramentas de IA avulsas</p>
            <h1 className="mt-3 text-4xl/tight md:text-6xl font-semibold tracking-tight">
              Poder de IA sob demanda, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400">sem mensalidade</span>.
            </h1>
            <p className="mt-5 text-neutral-300 text-lg">
              Escolha a ferramenta, carregue créditos e rode. Simples, modular e sem contratos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/portal"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 hover:opacity-90"
              >
                Começar agora
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border border-white/15 hover:bg-white/5"
              >
                Ver recursos
              </a>
            </div>

            {/* faixa animada de logos/nomes de IA */}
            <div className="mt-10">
              <LogoCloud />
            </div>

            <p className="mt-4 text-sm text-neutral-400">Pague por uso. Recarregue quando quiser.</p>
          </div>
        </div>
      </section>

      <FeaturesCarousel />

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 space-y-3">
            {[
              { q: "Tem plano mensal?", a: "Não. O modelo é 100% pay-as-you-go com créditos." },
              { q: "Posso usar créditos em qualquer IA?", a: "Sim, os créditos são compartilhados entre as ferramentas compatíveis." },
              { q: "Como funciona o reembolso?", a: "Pedidos em até 7 dias se os créditos não forem utilizados." },
              { q: "Existe Portal do Cliente?", a: "Sim. No /portal você gerencia créditos, histórico e APIs." },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border border-white/10 bg-white/5 p-4">
                <summary className="cursor-pointer list-none font-medium">{item.q}</summary>
                <p className="mt-2 text-sm text-neutral-300">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10">
            <a href="/portal" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 hover:opacity-90">
              Entrar no Portal
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} IA.HIVE. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-200">Privacidade</a>
            <a href="#" className="hover:text-neutral-200">Termos</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

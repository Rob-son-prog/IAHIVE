"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Code2, Lock, Copy } from "lucide-react";
import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";

export default function ApisPortalPage() {
  const [copied, setCopied] = useState(false);

  // CHAVE FICTÍCIA – APENAS DEMO
  const fakeKey = "sk_live_iahive_xxxxxxxxxxxxxxxxx_demo";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fakeKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencioso, é só um detalhe visual
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-6 lg:px-6">
        {/* Topo: Voltar + título + CreditBar */}
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <span className="text-xs">←</span>
              <span>Voltar</span>
            </Link>

            <div className="flex flex-col">
              <h1 className="flex items-center gap-2 text-sm font-medium text-slate-200 md:text-base">
                IA.HIVE APIs
                <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-yellow-100">
                  <Lock className="h-3 w-3" />
                  Em desenvolvimento
                </span>
              </h1>
              <p className="text-xs text-slate-400 md:text-sm">
                Esta área será o portal para desenvolvedores integrarem o
                IA.HIVE via código (API). No momento, a integração ainda não
                está disponível.
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

        {/* Conteúdo principal */}
        <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Coluna esquerda – Aviso principal / chave fake / exemplo de uso */}
          <section className="flex flex-col gap-4">
            {/* Card de aviso */}
            <div className="relative overflow-hidden rounded-2xl border border-yellow-400/25 bg-gradient-to-b from-yellow-500/10 via-slate-950 to-slate-950 p-4 shadow-[0_0_40px_rgba(250,204,21,0.25)] md:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top,rgba(250,204,21,0.45),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,1),transparent_55%)]" />

              <div className="relative space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/80 text-yellow-200 ring-1 ring-yellow-400/60">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-yellow-100/80">
                      Portal de API do IA.HIVE
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-50 md:text-2xl">
                      Integração via API em breve
                    </h2>
                    <p className="mt-1 text-sm text-slate-200/90">
                      Em breve você poderá usar os créditos do IA.HIVE em
                      qualquer sistema, loja virtual ou automação, chamando as
                      IAs de Imagem, Texto, Áudio e Vídeo diretamente via
                      HTTP.
                    </p>
                    <p className="mt-2 text-xs text-yellow-100/90">
                      <strong>Atenção:</strong> os exemplos abaixo são
                      apenas demonstrativos. Nenhuma chamada de API está ativa
                      neste momento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de chave de API (fictícia) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-100 ring-1 ring-slate-700">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Sua chave de API
                    </p>
                    <p className="text-xs text-slate-500">
                      Exemplo ilustrativo – a chave real será gerada quando a
                      API for habilitada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-[11px] font-mono text-slate-100">
                <span className="truncate">{fakeKey}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[10px] text-slate-200 transition hover:border-slate-400 hover:bg-slate-800"
                >
                  <Copy className="h-3 w-3" />
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Quando a API estiver ativa, cada cliente verá aqui sua própria
                chave secreta, vinculada ao saldo de créditos da conta.
              </p>
            </div>

            {/* Card com exemplo de requisição (mock) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-100 ring-1 ring-slate-700">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Exemplo de uso (futuro)
                  </p>
                  <p className="text-xs text-slate-500">
                    Exemplo de como será uma chamada para gerar imagem via
                    IA.HIVE API usando JavaScript (Node ou navegador).
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-black/70 p-3 text-[11px] font-mono text-slate-100">
                <pre className="overflow-x-auto whitespace-pre">
{`const res = await fetch("https://api.iahive.com/v1/images/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer SEU_API_KEY_AQUI",
  },
  body: JSON.stringify({
    prompt: "logo cyberpunk com raposa, neon roxo",
    model: "leonardo",
    aspect_ratio: "1:1",
    quality: "ultra",
  }),
});

// Em breve: resposta real com URL da imagem e uso de créditos
const data = await res.json();
console.log(data);`}
                </pre>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Esses endpoints ainda não estão ativos. Esta seção serve apenas
                como pré-visualização de como será a integração para
                desenvolvedores.
              </p>
            </div>
          </section>

          {/* Coluna direita – “Como vai funcionar” / roadmap */}
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Como vai funcionar a IA.HIVE API
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Esta aba será o seu painel de desenvolvedor para integrar o
                IA.HIVE em outros sistemas, sites, bots e automações.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                <p className="font-semibold text-slate-100">
                  1. Chave de API por conta
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Cada cliente terá uma chave secreta vinculada ao seu saldo de
                  créditos. Toda requisição via API desconta créditos da mesma
                  forma que o uso dentro do portal.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                <p className="font-semibold text-slate-100">
                  2. Endpoints para Imagem, Texto, Áudio e Vídeo
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  O plano é disponibilizar endpoints separados para cada tipo de
                  IA, mantendo o mesmo conceito do portal: modelos diferentes,
                  qualidade, dimensões e modos de geração.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                <p className="font-semibold text-slate-100">
                  3. Limites, fila e estabilidade
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Haverá limites por minuto / por segundo para manter a
                  estabilidade do sistema. Esses limites serão exibidos e
                  explicados aqui, junto com boas práticas de uso.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5">
                <p className="font-semibold text-slate-100">
                  4. Webhooks (futuro)
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Para tarefas mais pesadas (como vídeo e imagens complexas),
                  você poderá configurar um webhook para ser avisado quando a
                  geração terminar.
                </p>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/80 px-3 py-3 text-[11px] text-slate-500">
              <p>
                Quando a API estiver pronta, esta página será atualizada com
                documentação oficial, exemplos de código e geração real de
                chaves. Por enquanto, use os portais de Imagem, Texto, Áudio e
                Vídeo diretamente dentro do IA.HIVE.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

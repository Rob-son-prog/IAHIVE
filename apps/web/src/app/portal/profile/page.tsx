"use client";

import Link from "next/link";
import {
  User,
  ShieldCheck,
  Building2,
  Mail,
  MessageCircle,
  Globe2,
  Info,
} from "lucide-react";
import CreditBar from "@/components/portal/CreditBar";
import { userMock } from "@/data/portal-mock";

export default function ProfilePortalPage() {
  // aqui no futuro dá pra puxar dados reais do usuário logado
  const displayName = userMock?.name ?? "Cliente IA.HIVE";

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
                Perfil & confiança
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-100">
                  <ShieldCheck className="h-3 w-3" />
                  Segurança
                </span>
              </h1>
              <p className="text-xs text-slate-400 md:text-sm">
                Dados da sua conta e informações oficiais da empresa por trás do
                IA.HIVE.
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
        <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Coluna esquerda – Perfil do usuário */}
          <section className="flex flex-col gap-4">
            {/* Card perfil básico */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-100 ring-1 ring-slate-700">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Perfil do cliente
                  </h2>
                  <p className="text-xs text-slate-500">
                    Essas informações são usadas apenas para acesso e
                    comunicação com você.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Nome
                  </p>
                  <p className="text-sm text-slate-100">{displayName}</p>
                </div>

                {/* Se no futuro tiver e-mail real do usuário logado, dá pra trocar aqui */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    E-mail de login
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-100">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">
                      {/* placeholder, até integrar com dados reais */}
                      Seu e-mail cadastrado na plataforma
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Usado para acessar sua conta e receber comunicações
                    importantes sobre pagamentos e segurança.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Suporte oficial
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px]">
                      <MessageCircle className="h-3 w-3 text-emerald-300" />
                      WhatsApp comercial (atendimento IA.HIVE)
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px]">
                      <Mail className="h-3 w-3 text-sky-300" />
                      E-mail de suporte (em breve dentro do portal)
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Nunca enviaremos mensagens pedindo sua senha ou código
                    de verificação. Se alguém fizer isso, desconfie.
                  </p>
                </div>
              </div>
            </div>

            {/* Card de segurança / boas práticas */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <h2 className="text-sm font-semibold text-slate-100">
                  Segurança da sua conta
                </h2>
              </div>
              <ul className="mt-1 space-y-2 text-[11px] text-slate-400">
                <li>
                  • Nunca compartilhe sua senha ou códigos de acesso com
                  terceiros.
                </li>
                <li>
                  • A IA.HIVE não solicita dados sensíveis por WhatsApp ou
                  redes sociais (como fotos de documentos, cartões ou senhas).
                </li>
                <li>
                  • Confira sempre se o endereço do site é o oficial antes de
                  inserir dados de login ou pagamento.
                </li>
              </ul>
            </div>
          </section>

          {/* Coluna direita – Sobre a empresa / CNPJ / confiança */}
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 md:p-5">
            {/* Sobre a empresa */}
            <div className="space-y-2">
              <div className="mb-1 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-200" />
                <h2 className="text-sm font-semibold text-slate-100">
                  Sobre a empresa
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                O IA.HIVE é uma plataforma que oferece acesso a modelos de
                inteligência artificial sob demanda, no formato de{" "}
                <strong>créditos pré-pagos</strong>. A proposta é permitir que
                criadores, pequenos negócios e agências usem IA de Imagem,
                Texto, Áudio e Vídeo sem precisar contratar planos mensais
                complexos.
              </p>
              <p className="text-xs text-slate-300">
                Você recarrega créditos, usa conforme a necessidade e acompanha
                tudo pelo portal: geração de imagens, textos, áudios e vídeos
                em um só lugar.
              </p>
            </div>

            {/* Dados oficiais */}
            <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                <Info className="h-3.5 w-3.5" />
                Dados oficiais da empresa
              </p>

              <dl className="space-y-2 text-xs text-slate-200">
                <div>
                  <dt className="text-[11px] font-semibold text-slate-500">
                    Nome fantasia
                  </dt>
                  <dd>HIVE / IA.HIVE</dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold text-slate-500">
                    CNPJ
                  </dt>
                  <dd>52.112.247/0001-01</dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold text-slate-500">
                    País de registro
                  </dt>
                  <dd>Brasil</dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold text-slate-500">
                    Site oficial
                  </dt>
                  <dd className="flex items-center gap-1 text-xs text-sky-300">
                    <Globe2 className="h-3.5 w-3.5" />
                    <span>www.iahive.com (endereço oficial da plataforma, quando estiver público)</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
                Esses dados são exibidos para reforçar a transparência e a
                confiança com os clientes. O CNPJ é um dado público de
                empresas no Brasil e é usado para emissão de notas fiscais,
                contratos e processamento de pagamentos.
              </p>
            </div>

            {/* Rodapé de reembolso / aviso legal bem pequeno */}
            <div className="mt-1 rounded-xl border border-dashed border-slate-700 bg-slate-950/80 px-3 py-3">
              <p className="text-[10px] leading-relaxed text-slate-500">
                Os pagamentos são processados com segurança por intermediadores
                oficiais (como Mercado Pago). Reembolsos e ajustes de crédito
                seguem a política de uso da plataforma IA.HIVE, que será
                exibida em detalhes na área de{" "}
                <span className="font-semibold">Termos de uso</span> e{" "}
                <span className="font-semibold">Política de reembolso</span>.
                Sempre revise as condições antes de efetuar recargas de
                créditos.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    // Aqui no futuro você vai chamar a API real de recuperação de senha.
    await new Promise((r) => setTimeout(r, 800));

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#111827,_#020617)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/5 bg-black/60 p-6 shadow-[0_0_80px_rgba(56,189,248,0.25)] backdrop-blur-xl sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Recuperar senha
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Informe o e-mail que você usa no IA.HIVE. Se existir uma conta,
            vamos enviar um link para redefinir sua senha.
          </p>
        </div>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className={[
                "mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition",
                loading || !email.trim()
                  ? "cursor-not-allowed opacity-60"
                  : "hover:brightness-110",
              ].join(" ")}
            >
              {loading ? "Enviando link..." : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        {sent && (
          <div className="space-y-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100 sm:text-sm">
            <p className="font-medium">
              Se o e-mail existir, enviamos um link de recuperação.
            </p>
            <p className="text-emerald-100/80">
              Verifique sua caixa de entrada e também a pasta de spam. Você
              poderá definir uma nova senha a partir do link enviado.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400 sm:text-xs">
          <Link
            href="/login"
            className="text-sky-400 hover:text-sky-300 hover:underline"
          >
            Voltar para o login
          </Link>
          <Link
            href="/register"
            className="hover:text-slate-200 hover:underline"
          >
            Não tem conta? Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}

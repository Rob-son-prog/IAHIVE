"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.error ?? "Erro ao cadastrar.");
      } else {
        setOk(true);
        setTimeout(() => router.push("/login"), 800);
      }
    } catch (e) {
      setErr("Falha de rede.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Criar conta</h1>
        <p className="mt-1 text-sm text-neutral-400">Cadastre-se para acessar o Portal.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-white/20"
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-white/20"
            required
          />
          <input
            type="password"
            placeholder="Senha (mín. 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-white/20"
            required
            minLength={6}
          />

          {err && <p className="text-sm text-red-400">{err}</p>}
          {ok && <p className="text-sm text-emerald-400">Conta criada! Redirecionando…</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Já tem conta? <a href="/login" className="text-neutral-200 underline underline-offset-4">Entrar</a>
        </p>
      </div>
    </main>
  );
}

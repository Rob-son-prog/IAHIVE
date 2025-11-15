"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    // Importantíssimo: redirect: false para capturar erro
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/portal",
    });

    setLoading(false);

    if (res?.error) {
      // Mostra o erro (ex.: CredentialsSignin)
      setErr(
        res.error === "CredentialsSignin"
          ? "E-mail ou senha inválidos."
          : res.error
      );
      return;
    }

    // Sucesso: manda pro portal manualmente
    router.push("/portal");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Faça login na sua conta</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Use Google ou suas credenciais.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/portal" })}
          className="mt-6 w-full rounded-xl border border-white/15 px-4 py-2 hover:bg-white/5
             flex items-center justify-center gap-3"
          aria-label="Continuar com Google"
        >
          {/* Ícone oficial do Google (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.2-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.4 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6 29.7 4 24 4 16.1 4 9.2 8.5 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.1 0 9.9-1.9 13.5-5.2l-6.2-5.1C29.2 36 26.7 37 24 37c-5.2 0-9.6-3.1-11.4-7.6l-6.6 5.1C8.9 39.5 15.9 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.6 5.6-6.8 6.6l6.2 5.1C37.2 37.9 40 32.5 40 26c0-1.9-.2-3.7-.4-5.5z"
            />
          </svg>

          <span>Continuar com Google</span>
        </button>

        <div className="my-4 flex items-center justify-center gap-3 text-neutral-500 text-xs">
          <span className="h-px w-16 bg-white/10" />
          ou
          <span className="h-px w-16 bg-white/10" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-white/20"
          />
          <input
            type="password"
            required
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-white/20"
          />

          {/* Link de recuperação de senha */}
          <div className="mt-1 text-right">
            <a
              href="/forgot-password"
              className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {err && <p className="text-sm text-red-400">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-2 font-medium bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-neutral-200 underline underline-offset-4"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </main>
  );
}

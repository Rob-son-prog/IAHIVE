"use client";
import { useState } from "react";

export default function PromptBox({
  placeholder = "Descreva o que deseja gerar...",
  buttonLabel = "Gerar",
  onGenerate,
}: {
  placeholder?: string;
  buttonLabel?: string;
  onGenerate: (prompt: string) => Promise<void> | void;
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      await onGenerate(prompt.trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-3 md:p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="min-h-[84px] flex-1 resize-y rounded-xl border border-border bg-background p-3 text-sm outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-background disabled:opacity-50 md:self-start"
        >
          {loading ? "Gerando..." : buttonLabel}
        </button>
      </div>
    </form>
  );
}

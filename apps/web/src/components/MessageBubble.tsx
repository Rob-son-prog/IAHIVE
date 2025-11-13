"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          // base
          "relative max-w-[85%] rounded-2xl border px-3 py-2 text-[0.95rem] sm:px-4 sm:py-3 sm:text-base leading-relaxed whitespace-pre-wrap select-text",
          // estilos diferentes p/ usuário x IA
          isUser
            ? "bg-primary text-primary-foreground border-primary/60"
            : "bg-neutral-800 text-slate-50 border-neutral-700 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
        )}
      >
        {/* Botão de copiar só nas respostas da IA */}
        {!isUser && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/30 text-slate-300 hover:bg-black/50 hover:text-white transition"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}

        {content}
      </div>
    </div>
  );
}

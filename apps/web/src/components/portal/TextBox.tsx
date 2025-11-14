"use client";

import * as React from "react";
import { Paperclip, X } from "lucide-react";

type Props = {
  placeholder?: string;
  onSubmit: (text: string) => void;
  ctaIcon?: React.ReactNode;
  ctaLabel?: string;
  // NOVO (opcional): pai fica sabendo do arquivo
  onFileChange?: (file: File | null) => void;
};

export default function TextBox({
  placeholder = "Digite sua mensagem…",
  onSubmit,
  ctaIcon,
  ctaLabel,
  onFileChange,
}: Props) {
  const [value, setValue] = React.useState("");
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null);

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Auto-resize do textarea (sem criar nova caixa)
  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    const maxHeight = 200; // limite de altura; pode ajustar
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${newHeight}px`;
  };

  React.useEffect(() => {
    resizeTextarea();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const clearFile = () => {
    setAttachedFile(null);
    onFileChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    const text = value.trim();
    // mantém o comportamento atual: precisa ter texto para enviar
    if (!text) return;

    onSubmit(text);
    setValue("");

    // por enquanto limpamos o anexo depois de enviar
    clearFile();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter envia, Shift+Enter quebra linha
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Clique no clipe → abre seletor de arquivo
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  // Quando o usuário escolhe um arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAttachedFile(file);
    onFileChange?.(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Linha principal: clipe + textarea + botão enviar */}
      <div className="flex items-end gap-3">
        {/* Botão de anexo */}
        <button
          type="button"
          className="mb-1 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 hover:bg-background transition"
          onClick={handleAttachClick}
        >
          <Paperclip className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Textarea ocupa o espaço do card, sem nova borda/caixa */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground border-none"
        />

        {/* Botão redondo (apenas ícone), reaproveitando o ctaIcon */}
        <button
          type="button"
          onClick={handleSubmit}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:brightness-110 transition"
        >
          {ctaIcon ?? "↩︎"}
        </button>

        {/* Input de arquivo escondido */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          // aqui você pode limitar tipos: accept="application/pdf,image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Chip do arquivo anexado */}
      {attachedFile && (
        <div className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground">
          <span className="truncate max-w-[220px] sm:max-w-xs">
            📎 {attachedFile.name}{" "}
            <span className="opacity-70">
              ({(attachedFile.size / 1024 / 1024).toFixed(1)} MB)
            </span>
          </span>
          <button
            type="button"
            onClick={clearFile}
            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

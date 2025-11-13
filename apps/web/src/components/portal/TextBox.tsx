"use client";

import * as React from "react";

type Props = {
  placeholder?: string;
  onSubmit: (text: string) => void;
  ctaIcon?: React.ReactNode;
  ctaLabel?: string;
};

export default function TextBox({
  placeholder = "Digite sua mensagem…",
  onSubmit,
  ctaIcon,
  ctaLabel,
}: Props) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

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

  const handleSubmit = () => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter envia, Shift+Enter quebra linha
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-3">
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
        {/* Se um dia quiser texto junto, dá pra usar o ctaLabel aqui */}
      </button>
    </div>
  );
}

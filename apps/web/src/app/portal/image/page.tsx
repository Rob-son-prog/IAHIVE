"use client";

import { useState } from "react";
import CreditBar from "../../../components/portal/CreditBar";
import PromptBox from "../../../components/portal/PromptBox";
import { userMock } from "../../../data/portal-mock";

type Img = { id: string; url: string; };

export default function ImagePage() {
  const [images, setImages] = useState<Img[]>([]);

  async function handleGenerate(prompt: string) {
    // MOCK: simula geração criando 4 imagens placeholder após ~1s
    await new Promise((r) => setTimeout(r, 900));
    const seed = Math.abs(prompt.length % 10) + 1;
    const batch = Array.from({ length: 4 }).map((_, i) => ({
      id: `${Date.now()}_${i}`,
      url: `https://picsum.photos/seed/${seed}-${i}/512/512`,
    }));
    setImages(batch);
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
      <CreditBar credits={userMock.credits} usageThisMonth={userMock.usageThisMonth} />

      <div className="mt-6">
        <h1 className="text-xl font-semibold tracking-tight">Imagens</h1>
        <p className="text-sm text-neutral-400">Descreva a cena, estilo, iluminação, enquadramento…</p>
      </div>

      <div className="mt-4">
        <PromptBox
          placeholder="Ex.: Uma raposa cyberpunk correndo numa rua neon, 4k, dramatic lighting"
          onGenerate={handleGenerate}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="overflow-hidden rounded-2xl border border-neutral-800">
            <img src={img.url} alt="gerado" className="h-full w-full object-cover" />
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 text-sm text-neutral-400">
            As imagens geradas aparecerão aqui.
          </div>
        )}
      </div>
    </div>
  );
}

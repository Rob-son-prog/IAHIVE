"use client";

import Image from "next/image";

type ImageLoadingProps = {
  className?: string;
};

export default function ImageLoading({ className }: ImageLoadingProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className ?? ""}`}
    >
      <div className="flex items-center justify-center rounded-full bg-black/40 p-4 shadow-lg shadow-purple-500/20">
        <div className="relative h-16 w-16 animate-spin">
          <Image
            src="/brand/logo04.png"
            alt="Carregando IA.HIVE"
            fill
            sizes="64px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

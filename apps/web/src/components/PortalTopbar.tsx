"use client";

export default function PortalTopbar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/75 backdrop-blur">
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm text-neutral-400">Portal do Cliente</h1>
        <button
          onClick={onSignOut}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5"
          title="Encerrar sessão"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

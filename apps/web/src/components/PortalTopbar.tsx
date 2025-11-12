"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function PortalTopbar() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    // 1) encerra a sessão sem redirecionar automático
    await signOut({ redirect: false });
    // 2) leva para a tela de login
    router.replace("/login");
  }, [router]);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/70 px-4 py-3 backdrop-blur">
      <div className="text-sm text-muted">Portal do Cliente</div>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-border px-3 py-1.5 text-sm hover:bg-card"
        aria-label="Sair"
      >
        Sair
      </button>
    </div>
  );
}

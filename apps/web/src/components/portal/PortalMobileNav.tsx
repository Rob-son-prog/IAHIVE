"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import PortalSidebar from "../PortalSidebar";

export default function PortalMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante (só mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed left-3 top-3 z-40 rounded-xl border border-neutral-800 bg-background/80 px-3 py-2 backdrop-blur"
        aria-label="Abrir menu"
      >
        <FiMenu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 translate-x-[-100%] border-r border-neutral-800 bg-background transition-transform duration-300 ${
          open ? "translate-x-0" : ""
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-3">
          <span className="text-sm font-medium">IA.HIVE</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border border-neutral-800 px-2 py-1"
            aria-label="Fechar menu"
          >
            <FiX />
          </button>
        </div>

        {/* Reaproveita o seu Sidebar dentro do drawer */}
        <div className="p-2">
          <PortalSidebar />
        </div>
      </div>
    </>
  );
}

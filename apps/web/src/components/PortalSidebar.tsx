"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/credits", label: "Créditos" },
  { href: "/portal/history", label: "Histórico" },
  { href: "/portal/apis", label: "APIs" },
  { href: "/portal/profile", label: "Perfil" },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-60 border-r border-white/10 min-h-screen p-4">
      <div className="mb-4 text-sm uppercase text-neutral-400">IA.HIVE</div>
      <nav className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block rounded-lg px-3 py-2 text-sm ${
                active ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PortalSidebar from "../../components/PortalSidebar";
import PortalTopbar from "../../components/PortalTopbar";
import PortalMobileNav from "../../components/portal/PortalMobileNav";

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return null;
  return <>{children}</>;
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      {/* Botão/drawer mobile */}
      <PortalMobileNav />

      <div className="flex">
        {/* Sidebar apenas no desktop */}
        <aside className="hidden md:block w-[220px] shrink-0 border-r border-neutral-800">
          <PortalSidebar />
        </aside>

        {/* Conteúdo: sem margem no mobile; com margem no desktop */}
        <main className="w-full md:ml-[220px]">
          <PortalTopbar />
          {children}
        </main>
      </div>
    </AuthGate>
  );
}

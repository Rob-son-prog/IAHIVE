import Link from "next/link";

export default function IABox({
  title,
  desc,
  href,
  emoji,
}: {
  title: string;
  desc: string;
  href: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-20"
        style={{ background: "radial-gradient(120px 80px at 20% 0%, #a78bfa33, transparent 60%)" }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background text-xl">
            {emoji}
          </div>
          <div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted">{desc}</p>
          </div>
        </div>
        <div className="mt-1 rounded-full border border-border px-3 py-1 text-xs">
          Abrir
        </div>
      </div>
    </Link>
  );
}

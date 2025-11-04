import Link from "next/link";

export default function ActionTile({
  title,
  desc,
  href,
}: {
  title: string;
  desc?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 transition hover:-translate-y-0.5 hover:bg-neutral-900"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">{title}</h3>
          {desc && <p className="text-sm text-neutral-400">{desc}</p>}
        </div>
        <div className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-300 group-hover:bg-neutral-800">
          Abrir
        </div>
      </div>
    </Link>
  );
}

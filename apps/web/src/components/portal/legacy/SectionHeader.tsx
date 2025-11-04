import Link from "next/link";

export default function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-neutral-400">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-xl border border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

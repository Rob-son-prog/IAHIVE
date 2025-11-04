export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 shadow-[0_1px_0_#111]">
      <p className="text-xs uppercase tracking-wider text-neutral-400">{label}</p>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

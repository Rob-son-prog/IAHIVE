export default function CreditBadge({ value }: { value: number }) {
  const tone =
    value > 300 ? "text-emerald-400 border-emerald-800/60" :
    value > 100 ? "text-amber-400 border-amber-800/60" :
                  "text-red-400 border-red-800/60";
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs ${tone}`}>
      {value} créditos
    </span>
  );
}

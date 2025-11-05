export default function CreditBar({
  credits,
  usageThisMonth,
}: {
  credits: number;
  usageThisMonth: number;
}) {
  const monthlyGoal = Math.max(usageThisMonth, 200);
  const pct = Math.min(100, Math.round((usageThisMonth / monthlyGoal) * 100));

  return (
    <div className="rounded-2xl border border-border bg-card elev-panel p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted">Saldo disponível</p>
          <div className="mt-1 inline-flex items-baseline gap-2">
            <span className="text-2xl font-semibold">{credits}</span>
            <span className="text-sm text-muted">créditos</span>
          </div>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 md:mt-0">
          <span className="rounded-full border border-border px-3 py-1 text-xs">
            + Rende melhor com pacotes
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs">
            Uso do mês: {usageThisMonth}
          </span>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)]">
        <div
          className="h-full animate-[pulse_2.4s_ease-in-out_infinite] rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, rgba(34,197,94,0.65), rgba(168,85,247,0.65))",
          }}
        />
      </div>
      <div className="mt-1 text-right text-xs text-muted">{pct}% da meta mensal</div>
    </div>
  );
}


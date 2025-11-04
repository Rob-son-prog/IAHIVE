import type { HistoryItem } from "../../data/portal-mock";


function StatusPill({ status }: { status: HistoryItem["status"] }) {
  const map: Record<HistoryItem["status"], string> = {
    concluído: "border-emerald-800/60 text-emerald-400",
    falhou: "border-red-800/60 text-red-400",
    pendente: "border-amber-800/60 text-amber-400",
  };
  return (
    <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>
      {status}
    </span>
  );
}

export default function HistoryTable({ items }: { items: HistoryItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800">
      <div className="hidden grid-cols-12 bg-neutral-950/80 px-4 py-2 text-xs text-neutral-400 md:grid">
        <div className="col-span-3">Data</div>
        <div className="col-span-3">Ferramenta</div>
        <div className="col-span-3">Detalhes</div>
        <div className="col-span-2">Custo</div>
        <div className="col-span-1 text-right">Status</div>
      </div>

      <ul className="divide-y divide-neutral-900">
        {items.map((row) => (
          <li key={row.id} className="grid grid-cols-1 gap-2 bg-neutral-950/50 px-4 py-3 md:grid-cols-12">
            <div className="text-sm md:col-span-3">{row.date}</div>
            <div className="text-sm md:col-span-3">{row.tool}</div>
            <div className="text-sm text-neutral-300 md:col-span-3">{row.details}</div>
            <div className="text-sm md:col-span-2">{row.cost} créditos</div>
            <div className="md:col-span-1 md:text-right">
              <StatusPill status={row.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

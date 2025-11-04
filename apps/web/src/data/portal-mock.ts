export const userMock = {
  name: "Robson",
  credits: 240,
  usageThisMonth: 126,
  lastOp: {
    tool: "Gerador de Imagens (IA Studio)",
    date: "2025-11-03 17:21",
    cost: 8,
    status: "concluído",
  },
};

export const shortcuts = [
  { title: "Comprar créditos", href: "/portal/creditos", desc: "Adicione saldo" },
  { title: "Abrir APIs", href: "/portal/apis", desc: "Tokens e Webhooks" },
  { title: "Histórico", href: "/portal/historico", desc: "Consumos e logs" },
  { title: "Perfil", href: "/portal/perfil", desc: "Conta e segurança" },
];

export type HistoryItem = {
  id: string;
  date: string;
  tool: string;
  details: string;
  cost: number;
  status: "concluído" | "falhou" | "pendente";
};

export const historyMock: HistoryItem[] = [
  { id: "op_1009", date: "2025-11-03 17:21", tool: "Imagens", details: "4x 1024px", cost: 8, status: "concluído" },
  { id: "op_1008", date: "2025-11-03 16:02", tool: "Texto", details: "Roteiro vídeo (1.2k tokens)", cost: 5, status: "concluído" },
  { id: "op_1007", date: "2025-11-03 15:10", tool: "Áudio", details: "TTS pt-BR", cost: 2, status: "concluído" },
  { id: "op_1006", date: "2025-11-03 14:18", tool: "Vídeo", details: "Storyboard 6s", cost: 12, status: "falhou" },
  { id: "op_1005", date: "2025-11-03 12:47", tool: "Imagens", details: "Variantes x6", cost: 10, status: "concluído" },
];

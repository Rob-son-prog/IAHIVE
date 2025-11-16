"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as RTabs from "@radix-ui/react-tabs";

type CheckoutDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  amount: number; // em reais
};

export default function CheckoutDialog({ open, onOpenChange, amount }: CheckoutDialogProps) {
  const [tab, setTab] = React.useState<"pix" | "card">("pix");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // estado do PIX
  const [pix, setPix] = React.useState<{
    paymentId?: string;
    qrBase64?: string | null;
    qrCode?: string | null;
    expiresAt?: string | null;
  }>({});

  // controle do polling
  const pollRef = React.useRef<number | null>(null);
  const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  React.useEffect(() => {
    if (!open && pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
      setPix({});
      setErrorMsg(null);
    }
  }, [open]);

  async function handlePay(method: "pix" | "card") {
    try {
      setLoading(true);
      setErrorMsg(null);

      // chamada inicial
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(method === "pix" ? { amount, method: "pix" } : { amount, method: "card" }),
      });

      const data = await res.json();

      // Tratamento de erros amigáveis
      if (!data?.ok) {
        if (data?.error === "mp-missing-token") {
          setErrorMsg(
            "Configuração pendente: defina MP_ACCESS_TOKEN no apps/web/.env.local para habilitar pagamentos."
          );
        } else if (data?.error === "invalid-amount") {
          setErrorMsg("Valor inválido. Mínimo R$ 9,99.");
        } else {
          setErrorMsg("Não foi possível iniciar o pagamento no momento.");
        }
        return;
      }

      // PIX
      if (method === "pix") {
        setPix({
          paymentId: String(data.paymentId),
          qrBase64: data.qr_base64,
          qrCode: data.qr_code,
          expiresAt: data.expires_at,
        });

        // polling de status
        if (pollRef.current) window.clearInterval(pollRef.current);
        pollRef.current = window.setInterval(async () => {
          try {
            const r = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ op: "status", paymentId: data.paymentId }),
            });
            const s = await r.json();
            if (s?.ok && s.status === "approved") {
              window.clearInterval(pollRef.current!);
              pollRef.current = null;
              // TODO: creditar saldo via sua API (ou refetch)
              onOpenChange(false);
              alert("Pagamento aprovado! Créditos serão atualizados.");
            }
          } catch {}
        }, 4000) as unknown as number;

        return;
      }

      // Cartão → redirecionar para initPoint
      if (method === "card") {
        if (!data.initPoint) {
          setErrorMsg("Não foi possível iniciar o checkout do cartão.");
          return;
        }
        window.location.href = data.initPoint;
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Falha ao iniciar pagamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Escolha o método de pagamento para concluir a recarga.</DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-4 flex items-baseline justify-between">
            <div className="text-sm text-muted">Valor da recarga</div>
            <div className="text-2xl font-semibold">{brl(amount)}</div>
          </div>

          {errorMsg && (
            <div className="mb-3 rounded-md border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm">
              {errorMsg}
            </div>
          )}

          <RTabs.Root value={tab} onValueChange={(v) => setTab(v as "pix" | "card")} className="w-full">
            <RTabs.List className="grid w-full grid-cols-2 rounded-lg border border-border p-1">
              <RTabs.Trigger className="rounded-md px-3 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow" value="pix">
                PIX
              </RTabs.Trigger>
              <RTabs.Trigger className="rounded-md px-3 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow" value="card">
                Cartão
              </RTabs.Trigger>
            </RTabs.List>

            {/* PIX */}
            <RTabs.Content value="pix" className="mt-4">
              {!pix.qrBase64 ? (
                <>
                  <div className="space-y-3 text-sm text-muted">
                    <p>Geraremos um QR Code PIX para pagamento instantâneo.</p>
                    <p>Após a confirmação, seus créditos são liberados automaticamente.</p>
                  </div>
                  <Button className="mt-4 w-full" onClick={() => handlePay("pix")} disabled={loading}>
                    {loading ? "Processando..." : `Gerar QR PIX de ${brl(amount)}`}
                  </Button>
                </>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-border p-3">
                    <img
                      src={`data:image/png;base64,${pix.qrBase64}`}
                      alt="QR PIX"
                      className="w-56 h-56"
                    />
                    <div className="mt-2 text-xs text-muted">
                      Expira: {pix.expiresAt ? new Date(pix.expiresAt).toLocaleString() : "--"}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-sm font-medium mb-2">Código copia-e-cola</div>
                    <textarea
                      readOnly
                      className="w-full h-40 rounded-md border border-border bg-background p-2 text-xs"
                      value={pix.qrCode || ""}
                    />
                    <Button
                      className="mt-2 w-full"
                      type="button"
                      onClick={() => navigator.clipboard.writeText(pix.qrCode || "")}
                    >
                      Copiar código
                    </Button>
                    <div className="mt-3 text-xs text-muted">
                      Aguardando confirmação do pagamento...
                    </div>
                  </div>
                </div>
              )}
            </RTabs.Content>

            {/* CARTÃO */}
            <RTabs.Content value="card" className="mt-4">
              <div className="space-y-3 text-sm text-muted">
                <p>Você será redirecionado para o checkout seguro do Mercado Pago.</p>
                <p>Depois de aprovado, retornamos ao portal e creditamos seus créditos.</p>
              </div>
              <Button className="mt-4 w-full" onClick={() => handlePay("card")} disabled={loading}>
                {loading ? "Processando..." : `Pagar ${brl(amount)} no Cartão`}
              </Button>
            </RTabs.Content>
          </RTabs.Root>
        </div>

        {/* 🔻 NOVO RODAPÉ: garantia, reembolso e histórico (texto bem pequeno) */}
        <div className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
          <p>
            Pagamentos processados com segurança via Mercado Pago. Seus créditos são liberados
            automaticamente após a confirmação do pagamento.
          </p>
          <p className="mt-1">
            Reembolso disponível em até 7 dias, desde que os créditos não tenham sido utilizados.
            Em caso de falha na recarga, o saldo será ajustado automaticamente pela equipe IA.HIVE.
          </p>
          <p className="mt-1">
            Em breve você terá acesso a um histórico detalhado de recargas e consumo de créditos na
            área <span className="font-medium">Créditos</span> do portal.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

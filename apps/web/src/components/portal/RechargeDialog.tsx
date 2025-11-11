"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheckoutDialog from "./CheckoutDialog";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const MIN = 9.99;

export default function RechargeDialog({ open, onOpenChange }: Props) {
  // valor da recarga
  const [amount, setAmount] = React.useState<number>(50);
  // controla abertura do checkout
  const [openCheckout, setOpenCheckout] = React.useState(false);

  const setQuick = (v: number) => setAmount(v);

  const continueWith = (v: number) => {
    setAmount(v);
    setOpenCheckout(true);
  };

  const isBelowMin = !amount || Number(amount) < MIN;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* max-h + overflow para rolar no mobile */}
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Pré-pago Flex{" "}
              <span className="ml-2 rounded-full border px-2 py-[2px] text-xs text-muted">Recomendado</span>
            </DialogTitle>
            <DialogDescription>Escolha o valor para recarregar agora.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Coluna Esquerda - Valor livre */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-2xl font-semibold">Valor livre</div>
              <div className="mt-1 text-xs text-muted">mínimo R$ 9,99</div>

              <div className="mt-4">
                <div className="mb-2 text-sm text-muted">Escolha quanto recarregar</div>

                {/* Linha com wrap para não “apertar” */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Input com largura mínima e altura fixa */}
                  <div className="min-w-[180px] flex-1">
                    <Input
                      value={amount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = Number(e.target.value || 0);
                        setAmount(Number.isNaN(v) ? 0 : v);
                      }}
                      className="w-full h-9 text-foreground"
                      type="number"
                      min={MIN}
                      step={0.01}
                      placeholder="R$ 50,00"
                    />
                  </div>

                  {/* Chips com wrap e largura mínima */}
                  <div className="flex flex-wrap items-center gap-1">
                    {[50, 100, 250].map((v) => {
                      const active = amount === v;
                      return (
                        <Button
                          key={v}
                          variant="outline"
                          onClick={() => setQuick(v)}
                          type="button"
                          className={[
                            "min-w-[64px] px-3 py-1 text-xs",
                            active
                              ? "border-fuchsia-400 text-fuchsia-200"
                              : "border-border text-foreground",
                          ].join(" ")}
                        >
                          R$ {v}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Aviso de mínimo */}
                {isBelowMin && (
                  <div className="mt-2 text-xs text-red-400">
                    Valor mínimo para recarga é <span className="font-medium">R$ 9,99</span>.
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted">Créditos estimados</div>
                  <div className="text-lg font-semibold">{amount} créditos</div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted">Taxa de manutenção</div>
                  <div className="text-lg font-semibold">R$ 0,00</div>
                </div>
              </div>

              <Button
                className="mt-4 w-full bg-gradient-to-r from-indigo-400 to-fuchsia-500"
                onClick={() => setOpenCheckout(true)}
                type="button"
                disabled={isBelowMin}
              >
                Recarregar agora
              </Button>

              <div className="mt-3 text-xs text-muted">
                Pagamento seguro. Reembolso em até 7 dias se os créditos não forem utilizados.
              </div>
            </div>

            {/* Coluna Direita - Pacotes prontos */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-2xl font-semibold">Pacotes prontos</div>
              <div className="mt-1 text-xs text-muted">recarregue em 1 clique</div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="font-medium">R$ 50</div>
                    <div className="text-xs text-muted">excelente para começar e testar fluxos reais.</div>
                  </div>
                  <Button variant="outline" onClick={() => continueWith(50)} type="button">
                    Selecionar
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="font-medium">R$ 100</div>
                    <div className="text-xs text-muted">ideal para experimentos mais longos ou dois projetos.</div>
                  </div>
                  <Button variant="outline" onClick={() => continueWith(100)} type="button">
                    Selecionar
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="font-medium">R$ 250</div>
                    <div className="text-xs text-muted">para uso consistente e times pequenos.</div>
                  </div>
                  <Button variant="outline" onClick={() => continueWith(250)} type="button">
                    Selecionar
                  </Button>
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                variant="secondary"
                onClick={() => setOpenCheckout(true)}
                type="button"
                disabled={isBelowMin}
              >
                Continuar com R$ {amount}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout efetivo (PIX/Cartão) */}
      <CheckoutDialog open={openCheckout} onOpenChange={setOpenCheckout} amount={amount} />
    </>
  );
}

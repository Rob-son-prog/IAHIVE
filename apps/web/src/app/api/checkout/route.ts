import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: Request) {
  try {
    const { amount, method, paymentId, op } = await req.json();

    // 1) Polling de status
    if (op === "status" && paymentId) {
      const payment = await mercadopago.payment.findById(paymentId);
      const status = payment.body.status; // "approved" | "pending" | "rejected" etc.
      return NextResponse.json({ ok: true, status });
    }

    // 2) Validações
    const value = Number(amount);
    if (!value || value < 9.99) {
      return NextResponse.json({ ok: false, error: "invalid-amount" }, { status: 400 });
    }
    if (method !== "pix" && method !== "card") {
      return NextResponse.json({ ok: false, error: "invalid-method" }, { status: 400 });
    }

    // 3) PIX: criar pagamento e devolver QR
    if (method === "pix") {
      const p = await mercadopago.payment.create({
        transaction_amount: value,
        description: "Recarga de créditos (PIX)",
        payment_method_id: "pix",
        payer: { email: "pagador@example.com" }, // ajuste se quiser coletar e-mail real
      });

      const info = p.body.point_of_interaction?.transaction_data;
      return NextResponse.json({
        ok: true,
        method: "pix",
        paymentId: p.body.id,
        qr_base64: info?.qr_code_base64 || null,
        qr_code: info?.qr_code || null, // copia e cola
        expires_at: info?.qr_code_expiration_date || null,
      });
    }

    // 4) Cartão (Checkout Pro): criar Preference e redirecionar
    if (method === "card") {
      const pref = await mercadopago.preferences.create({
        items: [{ title: "Recarga de créditos", quantity: 1, currency_id: "BRL", unit_price: value }],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/portal?paid=1`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/portal?paid=pending`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/portal?paid=0`,
        },
        auto_return: "approved",
      });

      return NextResponse.json({
        ok: true,
        method: "card",
        initPoint: pref.body.init_point, // URL para redirecionar
        preferenceId: pref.body.id,
      });
    }

    return NextResponse.json({ ok: false, error: "unhandled" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "checkout-failed" }, { status: 500 });
  }
}

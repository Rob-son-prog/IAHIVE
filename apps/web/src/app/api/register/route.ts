import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Dados invalidos." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Senha muito curta (min. 6)." }, { status: 400 });
    }

    const exists = await db.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "E-mail ja cadastrado." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.user.create({
      data: { email, name, passwordHash }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
  }
}
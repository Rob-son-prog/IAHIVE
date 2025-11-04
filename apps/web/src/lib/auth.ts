import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  // Podemos manter o adapter (para contas OAuth), mas a sessão será JWT
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },  // <<<<<< chave: JWT (não database)

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });
        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Busca usuário
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        // Confere senha
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        // Retorna shape mínimo para o JWT
        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),
  ],

  pages: { signIn: "/login" },

  // Preenche o JWT e a session com o id do usuário
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // na primeira vez após login
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },

  // debug: true,
};
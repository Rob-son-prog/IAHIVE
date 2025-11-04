import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerHealthRoute } from "./routes/health.js";

const app = Fastify({ logger: true });

// CORS (deixe aberto por enquanto; depois restrinja)
await app.register(cors, { origin: true });

// Rotas
await registerHealthRoute(app);

const PORT = Number(process.env.PORT) || 4000;

app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => {
    console.log(`API ouvindo em http://localhost:${PORT}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

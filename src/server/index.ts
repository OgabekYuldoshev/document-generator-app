import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api").use(cors());

const appRouter = app

export const httpHandler = handle(app);

export default app;

export type AppType = typeof appRouter;

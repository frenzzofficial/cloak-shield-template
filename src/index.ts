// Vercel entrypoint. Vercel's zero-config Elysia detection needs a file at src/index.ts that
// imports the `elysia` package AND default-exports the app. `app.listen` is not supported there.
// See: https://vercel.com/docs/frameworks/backend/elysia
import { Elysia } from "elysia";

import { createApp } from "@/app/main";

const app = new Elysia({ name: "vercel-entry" }).use(createApp());

export default app;

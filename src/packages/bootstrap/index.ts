import type { Elysia } from "elysia";
import { registerHealthRoutes } from "../../app/health/health.routes";
import { registerStaticRoutes } from "../../app/static/static.routes";
import { registerOpenApi } from "../middlewares/openapi";
import { registerApiRoutes } from "./registerApiRoutes";

export const registerBootstrap = (app: Elysia): void => {
	// ── Health check ──────────────────────────────────────────────────────────────
	registerHealthRoutes(app);

	// ── Static Routes (HTML, assets) ──────────────────────────────────────────────────────────────
	registerStaticRoutes(app);

	// ── OpenAPI docs — must come before the routes it documents.
	registerOpenApi(app);

	// ── Versioned API routes ──────────────────────────────────────────────────────────────
	registerApiRoutes(app);
};

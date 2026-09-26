import { openapi } from "@elysiajs/openapi";
import type { Elysia } from "elysia";

import { envAppConfig } from "../env/app.env";
import { envPublicConfig } from "../env/public.env";

// Auto-generates OpenAPI docs from route schemas and serves an interactive page.
// Must be registered BEFORE the routes it should document — it can only pick up schemas
// from routes defined after it in the chain.
export const registerOpenApi = (app: Elysia): void => {
	if (!envAppConfig.ENABLE_SWAGGER) return;

	app.use(
		openapi({
			path: "/openapi",
			documentation: {
				info: {
					title: envPublicConfig.APP_NAME,
					version: envPublicConfig.APP_VERSION,
					description: envPublicConfig.APP_DESCRIPTION,
				},
			},
		}),
	);
};

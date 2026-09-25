import type { Elysia } from "elysia";
import { appConfig } from "../configs/app.config";

export const registerBootstrap = (app: Elysia): void => {
	app.get("/", ({ status }) => status(200, appConfig.site.message));

	app.get("/health", ({ status }) =>
		status(200, {
			status: "ok",
			message: appConfig.site.message,
			environment: appConfig.app.NODE_ENV,
		}),
	);
};

import { Elysia } from "elysia";
import { registerBootstrap } from "../packages/bootstrap";
import { registerErrorHandler } from "../packages/middlewares/error-handler";

export const createApp = (): Elysia => {
	const app = new Elysia({
		name: "api",
	});

	// Error handler FIRST: Elysia hooks only cover routes registered after them.
	registerErrorHandler(app);

	registerBootstrap(app);

	return app;
};

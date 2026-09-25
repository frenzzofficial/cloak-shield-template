import { describe, expect, test } from "bun:test";
import { createApp } from "../src/app/main";
import { AppError } from "../src/packages/utils/errors";

const app = createApp().get("/boom", () => {
	throw AppError.forbidden("nope");
});

const call = (path: string): Promise<Response> =>
	app.handle(new Request(`http://localhost${path}`));

describe("app", () => {
	test("GET / returns the welcome message", async () => {
		const response = await call("/");
		expect(response.status).toBe(200);
		expect(await response.text()).toBe("Welcome to Cloak Shield");
	});

	test("GET /health reports ok", async () => {
		const response = await call("/health");
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ status: "ok" });
	});

	test("unknown routes return a 404 JSON body, not a 500", async () => {
		const response = await call("/nope");
		expect(response.status).toBe(404);
		expect(await response.json()).toEqual({ success: false, message: "Not found" });
	});

	test("AppError maps to its status code", async () => {
		const response = await call("/boom");
		expect(response.status).toBe(403);
		expect(await response.json()).toEqual({ success: false, message: "nope" });
	});
});

import type { Elysia } from "elysia";
import { elysiaHelmet, permission } from "elysiajs-helmet";

import { envAppConfig } from "../env/app.env";

// Sets standard security response headers (CSP, X-Frame-Options, HSTS, Referrer-Policy, ...).
// This is a JSON API, not an HTML app, so the CSP is locked down to "nothing is allowed to
// load" rather than the library's HTML-oriented defaults.
//
// Register this early — before routes and before the rate limiter/CSRF checks — so every
// response gets these headers, including error responses.
export const registerSecurityHeaders = (app: Elysia): void => {
	if (!envAppConfig.ENABLE_SECURITY_HEADERS) return;

	app.use(
		elysiaHelmet({
			csp: {
				defaultSrc: [permission.NONE],
				frameSrc: [permission.NONE],
				objectSrc: [permission.NONE],
				baseUri: [permission.NONE],
			},
			frameOptions: "DENY",
			referrerPolicy: "no-referrer",
			xssProtection: true,
			dnsPrefetch: false,
			corp: "same-origin",
			coop: "same-origin",
			// HSTS only matters over HTTPS; harmless to send in development too.
			hsts: {
				maxAge: 15552000, // 180 days
				includeSubDomains: true,
				preload: false,
			},
		}),
	);
};

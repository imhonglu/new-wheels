import { expect, test } from "vitest";
import { hasValidDomainLength } from "./has-valid-domain-length.js";

test("hasValidDomainLength", () => {
	expect(hasValidDomainLength("example.com")).toBe(true);
	expect(hasValidDomainLength("a")).toBe(true);

	expect(hasValidDomainLength("")).toBe(false);

	expect(hasValidDomainLength("a".repeat(256))).toBe(false);
});

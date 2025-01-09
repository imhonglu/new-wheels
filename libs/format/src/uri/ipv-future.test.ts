import { expect, test } from "vitest";
import { InvalidIPvFutureError } from "./errors/invalid-ipv-future-error.js";
import { IPvFuture } from "./ipv-future.js";

test("should parse a valid IPvFuture string", () => {
	expect(IPvFuture.parse("v1.something-text")).toMatchObject({
		version: 1,
		address: "something-text",
	});

	expect(IPvFuture.parse("v1.something-text").toString()).toBe(
		"v1.something-text",
	);
	expect(JSON.stringify(IPvFuture.parse("v1.something-text"))).toBe(
		'"v1.something-text"',
	);
});

test("should throw an error for invalid IPvFuture strings", () => {
	expect(() => IPvFuture.parse("[v1something-text]")).toThrow(
		InvalidIPvFutureError,
	);
	expect(() => IPvFuture.parse("v.something-text")).toThrow(
		InvalidIPvFutureError,
	);
	expect(() => IPvFuture.parse("va.something-text")).toThrow(
		InvalidIPvFutureError,
	);
	expect(() => IPvFuture.parse("v.1something-text")).toThrow(
		InvalidIPvFutureError,
	);
	expect(() => IPvFuture.parse("v1.")).toThrow(InvalidIPvFutureError);
	expect(() => IPvFuture.parse("v1.@")).toThrow(InvalidIPvFutureError);
});

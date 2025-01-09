import { expect, test } from "vitest";
import { InvalidPathError } from "./errors/invalid-path-error.js";
import { Path } from "./path.js";

test("should parse a valid Path string", () => {
	expect(Path.parse("/simple/path")).toMatchObject({
		segments: ["simple", "path"],
	});

	expect(Path.parse("/simple/path").toString()).toBe("/simple/path");

	expect(JSON.stringify(Path.parse("/simple/path"))).toBe('"/simple/path"');
});

test("should handle URL encoded characters while maintaining encoded format", () => {
	expect(Path.parse("/path/with%20space")).toMatchObject({
		segments: ["path", "with%20space"],
	});
});

test("should normalize path by removing trailing slash", () => {
	expect(Path.parse("/path/with/")).toMatchObject({
		segments: ["path", "with"],
	});
});

test("should accept path-abempty starting with '/'", () => {
	expect(Path.parse("/")).toBeTruthy();
});

test("should accept path-absolute with segments", () => {
	expect(Path.parse("/path/to/resource")).toBeTruthy();
});

test("should accept path-noscheme (no leading slash)", () => {
	expect(Path.parse("path/to/resource")).toMatchObject({
		segments: ["path", "to", "resource"],
		isAbsolute: false,
	});

	expect(Path.parse("path/to/resource").toString()).toBe("path/to/resource");
});

test("should accept path-empty (zero-length)", () => {
	expect(Path.parse("")).toBeTruthy();
});

test("should parse a valid IRI path", () => {
	expect(Path.parse("경로", { isIri: true })).toMatchObject({
		segments: ["경로"],
	});

	expect(Path.parse("경로", { isIri: true }).toString()).toBe("경로");
});

test("should throw InvalidPathError for paths with invalid characters or format", () => {
	expect(() => Path.parse("/invalid/path/\u0000")).toThrow(InvalidPathError);
	expect(() => Path.parse("/path/with/<invalid>")).toThrow(InvalidPathError);
	expect(() => Path.parse("/path//with")).toThrow(InvalidPathError);
	expect(() => Path.parse("//path/with/")).toThrow(InvalidPathError);
	expect(() => Path.parse("경로")).toThrow(InvalidPathError);
});

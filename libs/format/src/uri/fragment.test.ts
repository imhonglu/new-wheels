import { expect, test } from "vitest";
import { InvalidFragmentError } from "./errors/invalid-fragment-error.js";
import { Fragment } from "./fragment.js";

test("should parse a valid Fragment string", () => {
	expect(Fragment.parse("section1")).toMatchObject({
		text: "section1",
	});

	expect(Fragment.parse("section1").toString()).toBe("section1");
	expect(JSON.stringify(Fragment.parse("section1"))).toBe('"section1"');
});

test("should parse empty fragment", () => {
	expect(Fragment.parse("")).toMatchObject({
		text: "",
	});
});

test("should parse fragment with special characters", () => {
	expect(Fragment.parse("section/1?query=test&param=value")).toMatchObject({
		text: "section/1?query=test&param=value",
	});
});

test("should handle percent-encoded characters", () => {
	expect(Fragment.parse("section%201")).toMatchObject({
		text: "section%201",
	});
});

test("should parse a valid IRI fragment", () => {
	expect(Fragment.parse("프래그먼트", { isIri: true })).toMatchObject({
		text: "프래그먼트",
	});

	expect(Fragment.parse("프래그먼트", { isIri: true }).toString()).toBe(
		"프래그먼트",
	);
});

test("should throw InvalidFragmentError for invalid fragments", () => {
	expect(() => Fragment.parse("#invalid")).toThrow(InvalidFragmentError);
	expect(() => Fragment.parse("invalid#")).toThrow(InvalidFragmentError);
	expect(() => Fragment.parse("invalid fragment")).toThrow(
		InvalidFragmentError,
	);
	expect(() => Fragment.parse("프래그먼트")).toThrow(InvalidFragmentError);
	expect(() => Fragment.parse("프래그먼트\uE000", { isIri: true })).toThrow(
		InvalidFragmentError,
	);
});

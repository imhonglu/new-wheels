import { beforeEach, describe, expect, test } from "vitest";
import { Serializable } from "./serializable.js";

@Serializable
class Example {
	constructor(public readonly text: string) {}

	static parse(value: string) {
		return new Example(value);
	}

	static stringify(value: Example) {
		return value.text;
	}
}
const TEST_STRING = "example";

test("should create instance using parse method", () => {
	const example = Example.parse(TEST_STRING);
	expect(example.toString()).toBe(TEST_STRING);
	expect(JSON.stringify(example)).toBe(`"${TEST_STRING}"`);
});

test("should create instance using constructor", () => {
	const example = new Example(TEST_STRING);
	expect(example.toString()).toBe(TEST_STRING);
	expect(JSON.stringify(example)).toBe(`"${TEST_STRING}"`);
});

import { expect, test } from "vitest";
import { combinations } from "./combinations.js";

test("should generate all possible combinations from array of strings", () => {
	const source = ["a", "b", "c", "d", "e"];

	expect([...combinations(source)]).toEqual([
		["a"],
		["b"],
		["a", "b"],
		["c"],
		["a", "c"],
		["b", "c"],
		["a", "b", "c"],
		["d"],
		["a", "d"],
		["b", "d"],
		["a", "b", "d"],
		["c", "d"],
		["a", "c", "d"],
		["b", "c", "d"],
		["a", "b", "c", "d"],
		["e"],
		["a", "e"],
		["b", "e"],
		["a", "b", "e"],
		["c", "e"],
		["a", "c", "e"],
		["b", "c", "e"],
		["a", "b", "c", "e"],
		["d", "e"],
		["a", "d", "e"],
		["b", "d", "e"],
		["a", "b", "d", "e"],
		["c", "d", "e"],
		["a", "c", "d", "e"],
		["b", "c", "d", "e"],
		["a", "b", "c", "d", "e"],
	]);
});

test("should handle empty array", () => {
	expect([...combinations([])]).toEqual([]);
});

test("should handle single element array", () => {
	expect([...combinations(["a"])]).toEqual([["a"]]);
});

test("should handle array with two elements", () => {
	expect([...combinations(["a", "b"])]).toEqual([["a"], ["b"], ["a", "b"]]);
});

test("should work with numbers", () => {
	expect([...combinations([1, 2, 3])]).toEqual([
		[1],
		[2],
		[1, 2],
		[3],
		[1, 3],
		[2, 3],
		[1, 2, 3],
	]);
});

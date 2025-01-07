import { expect, test } from "vitest";

import { isAsyncFunction } from "./is-async-function.js";

test("should correctly identify async and non-async functions", () => {
	expect(isAsyncFunction(async () => {})).toBe(true);
	expect(isAsyncFunction(() => {})).toBe(false);

	// biome-ignore lint/complexity/useArrowFunction: test
	expect(isAsyncFunction(function () {})).toBe(false);
	// biome-ignore lint/complexity/useArrowFunction: test
	expect(isAsyncFunction(async function () {})).toBe(true);

	expect(isAsyncFunction(async () => Promise.resolve())).toBe(true);
	expect(isAsyncFunction(() => Promise.resolve())).toBe(false);

	expect(isAsyncFunction(Promise.resolve)).toBe(false);
});

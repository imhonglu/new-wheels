import { expect, test } from "vitest";
import { isLeadingCombiningMark } from "./is-leading-combining-mark.js";

test("should return true for a leading combining mark", () => {
	expect(isLeadingCombiningMark("\u0903hello")).toBe(true);
	expect(isLeadingCombiningMark("한국")).toBe(false);
});

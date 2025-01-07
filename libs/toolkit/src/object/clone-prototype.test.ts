import { expect, test } from "vitest";
import { clonePrototype } from "./clone-prototype.js";

test("should clone prototype", () => {
	expect(clonePrototype({ a: 1 })).toEqual({});
	expect(clonePrototype([])).toBeInstanceOf(Array);
	expect(clonePrototype(new Set())).toBeInstanceOf(Set);
	expect(clonePrototype(new Map())).toBeInstanceOf(Map);

	class Class {}
	expect(clonePrototype(new Class())).toBeInstanceOf(Class);
});

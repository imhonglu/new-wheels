import { expect, test } from "vitest";
import { Characters } from "./characters.js";

test("Characters class operations", () => {
	// Basic character set creation
	expect(new Characters("[abc]").toString()).toBe("[abc]");

	// Negation
	expect(new Characters("[abc]").negate().toString()).toBe("[^abc]");

	// Special characters handling
	expect(new Characters("[.*+?^${}()|[]\\]").toString()).toBe(
		"[.*+?^${}()|[]\\]",
	);

	// Empty character set
	expect(new Characters("[]").toString()).toBe("[]");
});

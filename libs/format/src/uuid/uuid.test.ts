import { expect, test } from "vitest";
import { UUID } from "./uuid.js";

test("should parse a valid UUID string", () => {
	expect(UUID.parse("2EB8AA08-AA98-11EA-B4AA-73B441D16380")).toMatchObject({
		segments: ["2EB8AA08", "AA98", "11EA", "B4AA", "73B441D16380"],
	});

	expect(UUID.parse("2eb8aa08-aa98-11ea-b4aa-73b441d16380").toString()).toBe(
		"2eb8aa08-aa98-11ea-b4aa-73b441d16380",
	);
	expect(
		JSON.stringify(UUID.parse("2eb8aa08-aa98-11ea-b4aa-73b441d16380")),
	).toBe('"2eb8aa08-aa98-11ea-b4aa-73b441d16380"');
});

test("should parse a valid UUID cases", () => {
	expect(UUID.parse("2eb8aa08-aa98-11ea-b4aa-73b441d16380")).toMatchObject({
		segments: ["2eb8aa08", "aa98", "11ea", "b4aa", "73b441d16380"],
	});
	expect(UUID.parse("2eb8aa08-AA98-11ea-B4Aa-73B441D16380")).toMatchObject({
		segments: ["2eb8aa08", "AA98", "11ea", "B4Aa", "73B441D16380"],
	});
	expect(UUID.parse("00000000-0000-0000-0000-000000000000")).toMatchObject({
		segments: ["00000000", "0000", "0000", "0000", "000000000000"],
	});
});

test("should throw an error for an invalid UUID", () => {
	expect(() => UUID.parse("2eb8aa08-aa98-11ea-b4aa-73b441d1638")).toThrow();
});

import { expect, test } from "vitest";
import { Duration } from "./duration.js";
import { InvalidDurationError } from "./errors/invalid-duration-error.js";

test("should parse a valid Duration string", () => {
  expect(Duration.parse("P4DT12H30M5S")).toMatchObject({
    day: 4,
    hour: 12,
    minute: 30,
    second: 5,
  });
  expect(Duration.parse("P4DT12H30M5S").toString()).toBe("P4DT12H30M5S");
  expect(JSON.stringify(Duration.parse("P4DT12H30M5S"))).toBe('"P4DT12H30M5S"');
});

test("should parse a valid Duration string with week", () => {
  expect(Duration.parse("P4W")).toMatchObject({
    week: 4,
  });
  expect(Duration.parse("P4W").toString()).toBe("P4W");
  expect(JSON.stringify(Duration.parse("P4W"))).toBe('"P4W"');
});

test("should throw an error for a Duration string with only 'P'", () => {
  expect(() => Duration.parse("P")).toThrow(InvalidDurationError);
});

test("should throw an error for a Duration string with mixed week", () => {
  expect(() => Duration.parse("P1Y2W")).toThrow(InvalidDurationError);
  expect(() => Duration.parse("P2WT12h")).toThrow(InvalidDurationError);
});

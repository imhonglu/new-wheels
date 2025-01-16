import { expect, test } from "vitest";
import { InvalidFullTimeError } from "./errors/invalid-full-time-error.js";
import { FullTime } from "./full-time.js";

test("should parse a valid FullTime string", () => {
  expect(
    FullTime.parse("15:59:60.123-08:00", {
      year: 1998,
      month: 12,
      day: 31,
    }),
  ).toMatchObject({
    hour: 15,
    minute: 59,
    second: 60,
    secfrac: ".123",
    offset: {
      sign: "-",
      hour: 8,
      minute: 0,
    },
  });
  expect(
    FullTime.parse("15:59:60.123-08:00", {
      year: 1998,
      month: 12,
      day: 31,
    }).toString(),
  ).toBe("15:59:60.123-08:00");
  expect(JSON.stringify(FullTime.parse("12:34:56.111+09:00"))).toBe(
    '"12:34:56.111+09:00"',
  );
});

test("should parse a valid FullTime string with case-insensitive Z", () => {
  expect(FullTime.parse("08:30:06z")).toMatchObject({
    hour: 8,
    minute: 30,
    second: 6,
    offset: undefined,
  });
});

test("should handle leap second and throw an error for invalid leap second", () => {
  expect(
    FullTime.parse("23:59:60Z", {
      year: 1998,
      month: 12,
      day: 31,
    }),
  ).toMatchObject({
    hour: 23,
    minute: 59,
    second: 60,
    offset: undefined,
  });
  expect(() =>
    FullTime.parse("23:59:61Z", {
      year: 1998,
      month: 12,
      day: 31,
    }),
  ).toThrow(InvalidFullTimeError);
});

test("should throw an error for FullTime string with invalid", () => {
  expect(() => FullTime.parse("01:02:03Z+00:30")).toThrow(InvalidFullTimeError);
  expect(() => FullTime.parse("25:00:00Z")).toThrow(InvalidFullTimeError);
  expect(() => FullTime.parse("1২:00:00Z")).toThrow(InvalidFullTimeError);
  expect(() => FullTime.parse("01:02:03+00:60")).toThrow(InvalidFullTimeError);
  expect(() => FullTime.parse("01:02:03+24:00")).toThrow(InvalidFullTimeError);
});

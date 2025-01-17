import { expect, test } from "vitest";
import { InvalidHostnameError } from "./errors/invalid-hostname-error.js";
import { Hostname } from "./hostname.js";

test("should parse a valid Hostname string (with TLD)", () => {
  expect(Hostname.parse("example.com")).toMatchObject({
    labels: ["example", "com"],
    tld: ".com",
  });
  expect(Hostname.parse("example.com").toString()).toBe("example.com");
  expect(JSON.stringify(Hostname.parse("example.com"))).toBe('"example.com"');
});

test("should parse a valid Hostname string", () => {
  expect(Hostname.parse("a")).toMatchObject({
    labels: ["a"],
  });
});

test("should throw an error for a hostname string that starts with a hyphen", () => {
  expect(() => Hostname.parse("-a-host-name-that-starts-with--")).toThrow(
    InvalidHostnameError,
  );
});

test("should throw an error for a hostname string with invalid characters", () => {
  expect(() => Hostname.parse("not_a_valid_host_name")).toThrow(
    InvalidHostnameError,
  );
});

test("should throw an error for a hostname string with a component that is too long", () => {
  expect(() =>
    Hostname.parse(
      // cspell:disable-next-line
      "a-vvvvvvvvvvvvvvvveeeeeeeeeeeeeeeerrrrrrrrrrrrrrrryyyyyyyyyyyyyyyy-long-host-name-component",
    ),
  ).toThrow(InvalidHostnameError);
});

test("should convert punycode to Unicode for valid IDN hostname", () => {
  // cspell:words 4gbwdl wgbh1c
  expect(Hostname.parse("xn--4gbwdl.xn--wgbh1c")).toMatchObject({
    labels: ["xn--4gbwdl", "xn--wgbh1c"],
  });
});

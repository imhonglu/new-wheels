import { expect, test } from "vitest";
import { IdnHostname } from "../hostname/idn-hostname.js";
import { IPv4Address } from "../ip-address/ipv4-address.js";
import { IPv6Address } from "../ip-address/ipv6-address.js";
import { Authority } from "./authority.js";
import { InvalidAuthorityError } from "./errors/invalid-authority-error.js";
import { IPvFuture } from "./ipv-future.js";

test("should parse a valid AuthorityString", () => {
  expect(Authority.parse("example.com")).toMatchObject({
    userinfo: undefined,
    host: expect.any(IdnHostname),
    port: undefined,
  });

  expect(Authority.parse("example.com").toString()).toBe("example.com");
  expect(JSON.stringify(Authority.parse("example.com"))).toBe('"example.com"');
});

test("should parse authority with userinfo", () => {
  expect(Authority.parse("user:pass@example.com")).toMatchObject({
    userinfo: "user:pass",
    host: expect.any(IdnHostname),
  });
});

test("should parse authority with port", () => {
  expect(Authority.parse("example.com:8080")).toMatchObject({
    host: expect.any(IdnHostname),
    port: 8080,
  });
});

test("should parse authority with all components", () => {
  expect(Authority.parse("user:pass@example.com:8080")).toMatchObject({
    userinfo: "user:pass",
    host: expect.any(IdnHostname),
    port: 8080,
  });
});

test("should parse authority with IPv4 address", () => {
  expect(Authority.parse("127.0.0.1:8080")).toMatchObject({
    host: expect.any(IPv4Address),
    port: 8080,
  });

  expect(Authority.parse("127.0.0.1:8080").toString()).toBe("127.0.0.1:8080");
});

test("should parse authority with IPv6 address", () => {
  expect(Authority.parse("[::1]")).toMatchObject({
    host: expect.any(IPv6Address),
    port: undefined,
  });

  expect(Authority.parse("[::1]:8080")).toMatchObject({
    host: expect.any(IPv6Address),
    port: 8080,
  });

  expect(Authority.parse("[::1]:8080").toString()).toBe("[::1]:8080");
});

test("should parse authority with IPvFuture", () => {
  expect(Authority.parse("[v1.example]")).toMatchObject({
    host: expect.any(IPvFuture),
    port: undefined,
  });

  expect(Authority.parse("[v1.example]").toString()).toBe("[v1.example]");
});

test("should parse a valid IRI authority", () => {
  expect(Authority.parse("유저@한글.com:8080", { isIri: true })).toMatchObject({
    userinfo: "유저",
    host: expect.any(IdnHostname),
    port: 8080,
  });

  expect(
    Authority.parse("유저@한글.com:8080", { isIri: true }).toString(),
  ).toBe("유저@한글.com:8080");
});

test("should parse a valid authority with IDN host", () => {
  expect(Authority.parse("user@한국.com:8080")).toMatchObject({
    host: expect.any(IdnHostname),
    port: 8080,
  });

  expect(Authority.parse("user@한국.com:8080").toString()).toBe(
    "user@xn--3e0b707e.com:8080",
  );
});

test("should throw error for invalid authority strings", () => {
  expect(() => Authority.parse("")).toThrow(InvalidAuthorityError);
  expect(() => Authority.parse("@@example.com")).toThrow(InvalidAuthorityError);
  expect(() => Authority.parse("example.com:")).toThrow(InvalidAuthorityError);
  expect(() => Authority.parse("example.com:abc")).toThrow(
    InvalidAuthorityError,
  );
  expect(() => Authority.parse("example.com:8080:8081")).toThrow(
    InvalidAuthorityError,
  );
  expect(() => Authority.parse(":8081")).toThrow(InvalidAuthorityError);
  expect(() => Authority.parse("유저@한글.com:8080")).toThrow(
    InvalidAuthorityError,
  );
});

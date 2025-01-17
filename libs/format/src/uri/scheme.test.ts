import { expect, test } from "vitest";
import { InvalidSchemeError } from "./errors/invalid-scheme-error.js";
import { Scheme } from "./scheme.js";

test("should parse a valid Scheme string", () => {
  expect(Scheme.parse("http")).toMatchObject({
    text: "http",
  });

  expect(Scheme.parse("http").toString()).toBe("http");
  expect(JSON.stringify(Scheme.parse("http"))).toBe('"http"');
});

test("should parse various valid schemes", () => {
  expect(Scheme.parse("https")).toMatchObject({
    text: "https",
  });
  expect(Scheme.parse("ftp")).toMatchObject({
    text: "ftp",
  });
  expect(Scheme.parse("sftp")).toMatchObject({
    text: "sftp",
  });
  expect(Scheme.parse("file")).toMatchObject({
    text: "file",
  });
});

test("should parse schemes with allowed special characters", () => {
  expect(Scheme.parse("custom+scheme")).toMatchObject({
    text: "custom+scheme",
  });
  expect(Scheme.parse("my-scheme")).toMatchObject({
    text: "my-scheme",
  });
  expect(Scheme.parse("scheme.test")).toMatchObject({
    text: "scheme.test",
  });
});

test("should throw InvalidSchemeError for invalid schemes", () => {
  expect(() => Scheme.parse("")).toThrow(InvalidSchemeError);
  expect(() => Scheme.parse("123scheme")).toThrow(InvalidSchemeError);
  expect(() => Scheme.parse("scheme@test")).toThrow(InvalidSchemeError);
  expect(() => Scheme.parse("scheme:test")).toThrow(InvalidSchemeError);
  expect(() => Scheme.parse("scheme/test")).toThrow(InvalidSchemeError);
});

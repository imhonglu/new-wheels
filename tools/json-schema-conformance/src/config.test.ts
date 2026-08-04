import { expect, test } from "vitest";
import { parseSuiteLock } from "./config.js";

const validLock = {
  repository: "https://example.com/suite.git",
  revision: "a".repeat(40),
  draft: "draft2020-12",
  exclude: ["optional/example.json"],
};

test("parses a pinned suite lock", () => {
  expect(parseSuiteLock(JSON.stringify(validLock))).toEqual(validLock);
});

test.each([
  { ...validLock, revision: "main" },
  { ...validLock, repository: null },
  { ...validLock, exclude: [1] },
])("rejects an invalid suite lock", (lock) => {
  expect(() => parseSuiteLock(JSON.stringify(lock))).toThrow(
    "Invalid suite-lock.json",
  );
});

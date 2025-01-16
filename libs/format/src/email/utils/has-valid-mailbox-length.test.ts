import { expect, test } from "vitest";
import { hasValidMailboxLength } from "./has-valid-mailbox-length.js";

test("hasValidMailboxLength", () => {
  expect(hasValidMailboxLength("a@b")).toBe(true);
  expect(hasValidMailboxLength("user@example.com")).toBe(true);

  expect(hasValidMailboxLength("ab")).toBe(false);

  expect(hasValidMailboxLength("a".repeat(321))).toBe(false);
});

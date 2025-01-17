import { expect, test } from "vitest";
import { getCallsites } from "./get-callsites.js";

test("getCallsites should return valid callsite information", () => {
  const callsites = getCallsites();

  expect(callsites.length).toBeGreaterThan(0);

  const firstCallsite = callsites[0];

  expect(firstCallsite.getFileName()).toBe(__filename);

  expect(typeof firstCallsite.getLineNumber()).toBe("number");
  expect(typeof firstCallsite.getColumnNumber()).toBe("number");

  expect(firstCallsite.isConstructor()).toBe(false);
  expect(firstCallsite.isToplevel()).toBe(true);
});

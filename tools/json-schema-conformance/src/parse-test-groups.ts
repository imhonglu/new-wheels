import type { TestGroup } from "./types.js";

export function parseTestGroups(
  source: string,
  serialized: string,
): TestGroup[] {
  let value: unknown;

  try {
    value = JSON.parse(serialized);
  } catch (error) {
    throw new SyntaxError(`${source} contains invalid JSON`, { cause: error });
  }

  if (!Array.isArray(value)) {
    throw new TypeError(`${source} must contain an array of test groups`);
  }

  for (const group of value) {
    if (
      typeof group !== "object" ||
      group === null ||
      typeof group.description !== "string" ||
      !("schema" in group) ||
      !Array.isArray(group.tests)
    ) {
      throw new TypeError(`${source} contains an invalid test group`);
    }

    for (const testCase of group.tests) {
      if (
        typeof testCase !== "object" ||
        testCase === null ||
        typeof testCase.description !== "string" ||
        typeof testCase.valid !== "boolean" ||
        !("data" in testCase)
      ) {
        throw new TypeError(`${source} contains an invalid test case`);
      }
    }
  }

  return value as TestGroup[];
}

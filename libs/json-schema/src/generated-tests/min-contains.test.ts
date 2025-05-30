/* This file is automatically generated. Do not edit this file. */
import { describe, expect, test } from "vitest";
import { Schema } from "../schema.js";
describe("minContains without contains is ignored", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    minContains: 1,
  };
  test("one item valid against lone minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeTruthy();
  });
  test("zero items still valid against lone minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
});
describe("minContains=1 with contains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    minContains: 1,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("no elements match", () => {
    const instance = new Schema(schema);
    expect(instance.validate([2])).toBeFalsy();
  });
  test("single element matches, valid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeTruthy();
  });
  test("some elements match, valid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeTruthy();
  });
  test("all elements match, valid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeTruthy();
  });
});
describe("minContains=2 with contains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    minContains: 2,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("all elements match, invalid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeFalsy();
  });
  test("some elements match, invalid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2])).toBeFalsy();
  });
  test("all elements match, valid minContains (exactly as needed)", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeTruthy();
  });
  test("all elements match, valid minContains (more than needed)", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1, 1])).toBeTruthy();
  });
  test("some elements match, valid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 2, 1])).toBeTruthy();
  });
});
describe("minContains=2 with contains with a decimal value", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    minContains: 2,
  };
  test("one element matches, invalid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeFalsy();
  });
  test("both elements match, valid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeTruthy();
  });
});
describe("maxContains = minContains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    maxContains: 2,
    minContains: 2,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("all elements match, invalid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeFalsy();
  });
  test("all elements match, invalid maxContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1, 1])).toBeFalsy();
  });
  test("all elements match, valid maxContains and minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeTruthy();
  });
});
describe("maxContains < minContains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    maxContains: 1,
    minContains: 3,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeFalsy();
  });
  test("invalid minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeFalsy();
  });
  test("invalid maxContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1, 1])).toBeFalsy();
  });
  test("invalid maxContains and minContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeFalsy();
  });
});
describe("minContains = 0", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    minContains: 0,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("minContains = 0 makes contains always pass", () => {
    const instance = new Schema(schema);
    expect(instance.validate([2])).toBeTruthy();
  });
});
describe("minContains = 0 with maxContains", () => {
  const schema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    contains: { const: 1 },
    minContains: 0,
    maxContains: 1,
  };
  test("empty data", () => {
    const instance = new Schema(schema);
    expect(instance.validate([])).toBeTruthy();
  });
  test("not more than maxContains", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1])).toBeTruthy();
  });
  test("too many", () => {
    const instance = new Schema(schema);
    expect(instance.validate([1, 1])).toBeFalsy();
  });
});

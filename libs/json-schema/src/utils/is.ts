import { composeGuards } from "@imhonglu/type-guard";

function nonNullableObject(value: unknown): value is Exclude<object, null> {
  return typeof value === "object" && value !== null;
}

export const is = composeGuards({
  nonNullableObject,

  null: (value): value is null => value === null,
  boolean: (value): value is boolean => typeof value === "boolean",
  object: (value): value is Exclude<object, Array<unknown> | null> =>
    nonNullableObject(value) && !Array.isArray(value),
  array: (value): value is unknown[] => Array.isArray(value),
  string: (value): value is string => typeof value === "string",
  number: (value): value is number => typeof value === "number",
  integer: (value): value is number => Number.isInteger(value),
});

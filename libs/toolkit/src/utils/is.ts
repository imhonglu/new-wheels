import { composeGuards } from "@imhonglu/type-guard";
import type { Fn } from "../types/fn.js";
import type { NullishValue } from "../types/nullish-value.js";

export const is = composeGuards({
  propertyKey: (value): value is PropertyKey =>
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol",

  nullishValue: (value): value is NullishValue =>
    value === null || value === undefined,

  nonNullableObject: (value): value is NonNullable<object> =>
    typeof value === "object" && value !== null,

  newable: (value): value is Fn.Newable =>
    typeof value === "function" &&
    !!value.prototype &&
    value.prototype.constructor === value,
});

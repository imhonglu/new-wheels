import type { ArrayElement } from "@imhonglu/toolkit";
import type { BooleanSchema } from "../json-schema/index.js";
import type { Match } from "./match.js";

export interface SchemaInstanceTypeMap<T> {
  null: null;

  boolean: boolean;

  number: number;

  integer: number;

  array: T extends { items: infer U } ? SchemaInstanceType<U>[] : unknown[];

  string: string;

  object: T extends { properties: Record<infer K, unknown> }
    ? T extends {
        required: Array<infer U extends K>;
      }
      ? // When required array is empty, all properties are optional
        [U] extends [never]
        ? { [P in K]?: SchemaInstanceType<T["properties"][P]> }
        : // When all properties are required (no optional properties)
          Exclude<K, U> extends never
          ? { [P in U]: SchemaInstanceType<T["properties"][P]> }
          : // When there are both required and optional properties
            { [P in U]: SchemaInstanceType<T["properties"][P]> } & {
              [P in Exclude<K, U>]?: SchemaInstanceType<T["properties"][P]>;
            }
      : // When required array is undefined, all properties are optional
        { [P in K]?: SchemaInstanceType<T["properties"][P]> }
    : Record<string, unknown>;
}

export type SchemaInstanceType<T> = T extends BooleanSchema
  ? unknown
  : T extends { const: infer U }
    ? U
    : T extends { enum: infer U }
      ? ArrayElement<U>
      : T extends { type: infer U }
        ? Match<U, SchemaInstanceTypeMap<T>>
        : never;

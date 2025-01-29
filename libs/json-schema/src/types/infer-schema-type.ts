import type { ArrayElement } from "@imhonglu/toolkit";
import type { Schema } from "../schema.js";
import type { BooleanSchema } from "./json-schema/index.js";
import type { Match } from "./match.js";

export interface InferSchemaTypeMap<T> {
  null: null;
  boolean: boolean;
  number: number;
  integer: number;
  array: T extends { items: infer U } ? InferSchemaType<U>[] : unknown[];
  string: string;
  object: T extends { properties: Record<infer K, unknown> }
    ? T extends {
        required: Array<infer U extends K>;
      }
      ? { [P in K & U]: InferSchemaType<T["properties"][P]> } & {
          [P in Exclude<K, U>]?: InferSchemaType<T["properties"][P]>;
        }
      : { [P in K]?: InferSchemaType<T["properties"][P]> }
    : Record<string, unknown>;
}

export type InferSchemaType<T> = T extends BooleanSchema
  ? unknown
  : T extends { const: infer U }
    ? U
    : T extends { enum: infer U }
      ? ArrayElement<U>
      : T extends { type: infer U }
        ? Match<U, InferSchemaTypeMap<T>>
        : T extends Schema<infer U>
          ? T extends { new (...args: unknown[]): infer U }
            ? U
            : InferSchemaType<U>
          : never;

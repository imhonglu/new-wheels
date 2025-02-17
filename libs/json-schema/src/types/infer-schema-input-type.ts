import type { InferPropertyKeyWithDefault } from "./infer-property-key-with-default.js";
import type { InferSchemaType } from "./infer-schema-type.js";
import type { Match } from "./match.js";

export interface InferSchemaInputTypeMap<T> {
  null: InferSchemaType<T>;

  boolean: InferSchemaType<T>;

  number: InferSchemaType<T>;

  integer: InferSchemaType<T>;

  array: InferSchemaType<T>;

  string: InferSchemaType<T>;

  object: InferPropertyKeyWithDefault<T> extends never
    ? InferSchemaType<T>
    : T extends {
          properties: Record<infer K, unknown>;
          required: Array<infer U>;
        }
      ? // if every required property is included in the properties, then all properties are required
        Exclude<K & U, InferPropertyKeyWithDefault<T>> extends never
        ? {
            [P in K]?: InferSchemaType<T["properties"][P]>;
          }
        : {
            [P in Exclude<
              K & U,
              InferPropertyKeyWithDefault<T>
            >]: InferSchemaType<T["properties"][P]>;
          } & {
            [P in Exclude<
              K,
              Exclude<U, InferPropertyKeyWithDefault<T>>
            >]?: InferSchemaType<T["properties"][P]>;
          }
      : InferSchemaType<T>;
}

export type InferSchemaInputType<T> = T extends { type: infer U }
  ? Match<U, InferSchemaInputTypeMap<T>>
  : InferSchemaType<T>;

import type { InferPropertyKeyWithDefault } from "./infer-property-key-with-default.js";
import type { InferSchemaType } from "./infer-schema-type.js";
import type { Match } from "./match.js";
import type { Optional } from "./optional.js";

export interface InferSchemaInputTypeMap<T> {
  null: InferSchemaType<T>;

  boolean: InferSchemaType<T>;

  number: InferSchemaType<T>;

  integer: InferSchemaType<T>;

  array: InferSchemaType<T>;

  string: InferSchemaType<T>;

  object: InferPropertyKeyWithDefault<T> extends never
    ? InferSchemaType<T>
    : Optional<InferSchemaType<T>, InferPropertyKeyWithDefault<T>>;
}

export type InferSchemaInputType<T> = T extends { type: infer U }
  ? Match<U, InferSchemaInputTypeMap<T>>
  : InferSchemaType<T>;

import type { InferSchemaInputType } from "./infer-schema-input-type.js";
import type { PickRequired } from "./pick-required.js";

export type SchemaConstructorParams<T> = PickRequired<
  InferSchemaInputType<T>
> extends never
  ? [data?: InferSchemaInputType<T>]
  : [data: InferSchemaInputType<T>];

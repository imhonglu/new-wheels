import type { SafeResult } from "@imhonglu/toolkit";
import type { InferSchemaInputType } from "./infer-schema-input-type.js";
import type { InferSchemaType } from "./infer-schema-type.js";
import type { SchemaClassProperty } from "./schema-class-property.js";
import type { SchemaConstructorParams } from "./schema-constructor-params.js";

export type SchemaConstructorReturn<T> = InferSchemaType<T> extends Exclude<
  object,
  null
>
  ? T extends { type: unknown }
    ? InferSchemaType<T> & SchemaClassProperty<InferSchemaType<T>>
    : SchemaClassProperty<InferSchemaType<T>>
  : SchemaClassProperty<InferSchemaType<T>>;

export type SchemaParseContext<T> = {
  new (data: InferSchemaInputType<T>): T;
};

export type SchemaClass<T> = {
  new (...args: SchemaConstructorParams<T>): SchemaConstructorReturn<T>;
  parse: <T>(this: SchemaParseContext<T>, data: unknown) => T;
  safeParse: <T>(this: SchemaParseContext<T>, data: unknown) => SafeResult<T>;
};

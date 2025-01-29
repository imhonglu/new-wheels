import type { StructuralValidation } from "./json-schema/structural-validation.js";

export interface ConstSchemaInput {
  const: NonNullable<StructuralValidation.Any["const"]>;
  enum?: never;
  type?: never;
}

export interface EnumSchemaInput {
  enum: NonNullable<StructuralValidation.Any["enum"]>;
  const?: never;
  type?: never;
}

export interface TypeSchemaInput {
  type: NonNullable<StructuralValidation.Any["type"]>;
  const?: never;
  enum?: never;
}

export type SchemaInput = ConstSchemaInput | EnumSchemaInput | TypeSchemaInput;

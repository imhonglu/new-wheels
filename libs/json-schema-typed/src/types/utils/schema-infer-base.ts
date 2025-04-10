import type { StructuralValidation } from "../json-schema/structural-validation.js";

export interface ConstKeywordInferBase {
  const: NonNullable<StructuralValidation.Any["const"]>;
  enum?: never;
  type?: never;
}

export interface EnumKeywordInferBase {
  enum: NonNullable<StructuralValidation.Any["enum"]>;
  const?: never;
  type?: never;
}

export interface TypeKeywordInferBase {
  type: NonNullable<StructuralValidation.Any["type"]>;
  const?: never;
  enum?: never;
}

export type SchemaInferBase =
  | ConstKeywordInferBase
  | EnumKeywordInferBase
  | TypeKeywordInferBase;

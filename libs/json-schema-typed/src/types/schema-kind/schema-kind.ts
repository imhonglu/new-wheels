import type { BooleanSchema } from "../json-schema/index.js";
import type { ConstKeywordSchema } from "./const-keyword-schema.js";
import type { EnumKeywordSchema } from "./enum-keyword-schema.js";
import type { TypeKeywordSchema } from "./type-keyword-schema.js";

export type SchemaKind =
  | BooleanSchema
  | ConstKeywordSchema
  | EnumKeywordSchema
  | TypeKeywordSchema;

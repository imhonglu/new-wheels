import type { Schema } from "../schema.js";
import type { ConstSchema } from "./const-schema.js";
import type { EnumSchema } from "./enum-schema.js";
import type { BooleanSchema } from "./json-schema/index.js";
import type { TypeSchema } from "./type-schema.js";

export type SchemaVariant =
  | BooleanSchema
  | ConstSchema
  | EnumSchema
  | TypeSchema
  | Schema;

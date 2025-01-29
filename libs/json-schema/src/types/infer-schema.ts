import type { ArrayElement, Fn } from "@imhonglu/toolkit";
import type { Schema } from "../schema.js";
import type { InferPropertyKey } from "./infer-property-key.js";
import type { InferSchemaType } from "./infer-schema-type.js";
import type { ApplyingSubSchema } from "./json-schema/applying-sub-schema.js";
import type { BasicMetaData } from "./json-schema/basic-meta-data.js";
import type { Format } from "./json-schema/format.js";
import type { StringEncodedData } from "./json-schema/string-encoded-data.js";
import type { StructuralValidation } from "./json-schema/structural-validation.js";
import type { Match } from "./match.js";
import type { SchemaInput } from "./schema-input.js";
import type { TypeSchema } from "./type-schema.js";

export interface InferSchemaMap<T> {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  null: {};

  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  boolean: {};

  number: StructuralValidation.Numeric;

  integer: StructuralValidation.Numeric;

  array: StructuralValidation.Array & {
    [P in keyof ApplyingSubSchema.Array]?: T extends {
      [K in P]: infer U;
    }
      ? P extends "prefixItems"
        ? {
            [P in keyof U]: InferSchema<U[P]>;
          }
        : InferSchema<U>
      : ApplyingSubSchema.Array[P];
  };

  string: StructuralValidation.String & StringEncodedData & Format;

  object: StructuralValidation.Object<InferPropertyKey<T>> & {
    [P in keyof ApplyingSubSchema.Object]?: T extends {
      [K in P]: infer U;
    }
      ? P extends "properties" | "patternProperties"
        ? {
            [P in keyof U]: InferSchema<U[P]>;
          }
        : InferSchema<U>
      : ApplyingSubSchema.Object[P];
  };
}

export type InferSchema<T> = Omit<T, keyof BasicMetaData> extends {
  const: infer U;
}
  ? T & BasicMetaData<U>
  : T extends { enum: infer U }
    ? T & BasicMetaData<ArrayElement<U>>
    : T extends { type: infer U }
      ? Omit<T, Exclude<keyof TypeSchema, "type">> &
          Match<U, InferSchemaMap<T>> &
          Omit<BasicMetaData<InferSchemaType<T>>, "default"> & {
            default?:
              | InferSchemaType<T>
              | Fn.Callable<{ return: InferSchemaType<T> }>;
          }
      : T extends Schema<infer U>
        ? T
        : SchemaInput;

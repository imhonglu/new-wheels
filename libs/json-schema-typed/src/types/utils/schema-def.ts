import type { ArrayElement, Fn } from "@imhonglu/toolkit";
import type { ApplyingSubSchema } from "../json-schema/applying-sub-schema.js";
import type { BasicMetaData } from "../json-schema/basic-meta-data.js";
import type { Format } from "../json-schema/format.js";
import type { StringEncodedData } from "../json-schema/string-encoded-data.js";
import type { StructuralValidation } from "../json-schema/structural-validation.js";
import type { Match } from "./match.js";
import type { Properties } from "./properties.js";
import type { SchemaInferBase } from "./schema-infer-base.js";
import type { SchemaInstanceType } from "./schema-instance-type.js";

export interface SchemaDefMap<T> {
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
            [P in keyof U]: SchemaDef<U[P]>;
          }
        : SchemaDef<U>
      : ApplyingSubSchema.Array[P];
  };

  string: StructuralValidation.String & StringEncodedData & Format;

  object: StructuralValidation.Object<keyof Properties<T>> & {
    [P in keyof ApplyingSubSchema.Object]?: T extends {
      [K in P]: infer U;
    }
      ? P extends "properties" | "patternProperties"
        ? {
            [P in keyof U]: SchemaDef<U[P]>;
          }
        : SchemaDef<U>
      : ApplyingSubSchema.Object[P];
  };
}

export type SchemaDef<T> = Omit<T, keyof BasicMetaData> extends {
  const: infer U;
}
  ? T & BasicMetaData<U>
  : T extends { enum: infer U }
    ? T & BasicMetaData<ArrayElement<U>>
    : T extends { type: infer U }
      ? T &
          Match<U, SchemaDefMap<T>> &
          Omit<BasicMetaData<SchemaInstanceType<T>>, "default"> & {
            default?:
              | SchemaInstanceType<T>
              | Fn.Callable<{ return: SchemaInstanceType<T> }>;
          }
      : SchemaInferBase;

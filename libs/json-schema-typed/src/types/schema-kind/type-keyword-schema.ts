import type { ApplyingSubSchema } from "../json-schema/applying-sub-schema.js";
import type { BasicMetaData } from "../json-schema/basic-meta-data.js";
import type { Core } from "../json-schema/core.js";
import type { Format } from "../json-schema/format.js";
import type { StringEncodedData } from "../json-schema/string-encoded-data.js";
import type { StructuralValidation } from "../json-schema/structural-validation.js";
import type { SchemaKind } from "./schema-kind.js";

export interface TypeKeywordSchema
  extends Core<SchemaKind>,
    BasicMetaData,
    Omit<StructuralValidation.All, "const" | "enum">,
    ApplyingSubSchema.All<SchemaKind>,
    StringEncodedData<SchemaKind>,
    Format {}

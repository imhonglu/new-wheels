import type { ApplyingSubSchema } from "./json-schema/applying-sub-schema.js";
import type { BasicMetaData } from "./json-schema/basic-meta-data.js";
import type { Core } from "./json-schema/core.js";
import type { Format } from "./json-schema/format.js";
import type { StringEncodedData } from "./json-schema/string-encoded-data.js";
import type { StructuralValidation } from "./json-schema/structural-validation.js";
import type { SchemaVariant } from "./schema-variant.js";

export interface TypeSchema
  extends Core<SchemaVariant>,
    BasicMetaData,
    Omit<StructuralValidation.All, "const" | "enum">,
    ApplyingSubSchema.All<SchemaVariant>,
    StringEncodedData<SchemaVariant>,
    Format {}

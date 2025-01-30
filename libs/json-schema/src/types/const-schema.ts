import type { BasicMetaData } from "./json-schema/basic-meta-data.js";
import type { Core } from "./json-schema/core.js";
import type { StructuralValidation } from "./json-schema/structural-validation.js";
import type { SchemaVariant } from "./schema-variant.js";

export interface ConstSchema
  extends Core<SchemaVariant>,
    BasicMetaData,
    Pick<StructuralValidation.Any, "const"> {}

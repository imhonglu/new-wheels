import type { BasicMetaData } from "../json-schema/basic-meta-data.js";
import type { Core } from "../json-schema/core.js";
import type { StructuralValidation } from "../json-schema/structural-validation.js";
import type { SchemaKind } from "./schema-kind.js";

export interface EnumKeywordSchema
  extends Core<SchemaKind>,
    BasicMetaData,
    Pick<StructuralValidation.Any, "enum"> {}

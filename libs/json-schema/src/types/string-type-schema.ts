import type { BasicMetaData } from "./json-schema/basic-meta-data.js";
import type { Format } from "./json-schema/format.js";
import type { StringEncodedData } from "./json-schema/string-encoded-data.js";
import type { StructuralValidation } from "./json-schema/structural-validation.js";
import type { SchemaVariant } from "./schema-variant.js";

export interface StringTypeSchema
  extends BasicMetaData<string>,
    Pick<StructuralValidation.Any, "type">,
    StructuralValidation.String,
    StringEncodedData<SchemaVariant>,
    Format {}

import type { ApplyingSubSchema } from "./applying-sub-schema.js";
import type { BasicMetaData } from "./basic-meta-data.js";
import type { BooleanSchema } from "./boolean-schema.js";
import type { Core } from "./core.js";
import type { Format } from "./format.js";
import type { StringEncodedData } from "./string-encoded-data.js";
import type { StructuralValidation } from "./structural-validation.js";
import type { UnevaluatedLocations } from "./unevaluated-locations.js";

export * from "./applying-sub-schema.js";
export * from "./basic-meta-data.js";
export * from "./core.js";
export * from "./format.js";
export * from "./string-encoded-data.js";
export * from "./structural-validation.js";
export * from "./unevaluated-locations.js";
export * from "./boolean-schema.js";

/**
 * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#section-4.3.1 | ObjectSchema}
 */
export interface ObjectSchema
  extends Core<JsonSchema>,
    BasicMetaData,
    StructuralValidation.All,
    StringEncodedData<JsonSchema>,
    Format,
    ApplyingSubSchema.All<JsonSchema>,
    UnevaluatedLocations.All<JsonSchema> {}

export type JsonSchema = ObjectSchema | BooleanSchema;

import type { ApplyingSubSchema } from "./applying-sub-schema.js";
import type { BasicMetaData } from "./basic-meta-data.js";
import type { Core } from "./core.js";
import type { Format } from "./format.js";
import type { StringEncodedData } from "./string-encoded-data.js";
import type { StructuralValidation } from "./structural-validation.js";

export * from "./applying-sub-schema.js";
export * from "./basic-meta-data.js";
export * from "./core.js";
export * from "./format.js";
export * from "./string-encoded-data.js";
export * from "./structural-validation.js";

/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-json-schema-objects-and-key
 */
export interface ObjectSchema
	extends Core<JsonSchema>,
		BasicMetaData,
		StructuralValidation.All,
		StringEncodedData<JsonSchema>,
		Format,
		ApplyingSubSchema.All<JsonSchema> {}

/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-boolean-json-schemas
 */
export type BooleanSchema = boolean;

export type JsonSchema = ObjectSchema | BooleanSchema;

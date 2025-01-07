/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-the-json-schema-core-vocabu
 */
export interface Core<Schema = unknown> {
	$schema?: string;
	$vocabulary?: Record<string, boolean>;
	$id?: string;
	$anchor?: string;
	$dynamicAnchor?: string;
	$ref?: string;
	$dynamicRef?: string;
	$defs?: Record<string, Schema>;
	$comment?: string;
}

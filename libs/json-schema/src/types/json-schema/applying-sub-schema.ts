export namespace ApplyingSubSchema {
	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-keywords-for-applying-subschemas
	 */
	export interface Object<Schema = unknown> {
		properties?: Record<string, Schema>;
		patternProperties?: Record<string, Schema>;
		additionalProperties?: Schema;
		propertyNames?: Schema;
	}

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-keywords-for-applying-subschema
	 */
	export interface Array<Schema = unknown> {
		prefixItems?: Schema[];
		items?: Schema;
		contains?: Schema;
	}

	export type All<Schema = unknown> = Object<Schema> & Array<Schema>;
}

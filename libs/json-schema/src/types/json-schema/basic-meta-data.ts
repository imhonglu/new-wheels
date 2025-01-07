/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-a-vocabulary-for-basic-meta
 */
export interface BasicMetaData<T = unknown> {
	title?: string;
	description?: string;
	default?: T;
	deprecated?: boolean;
	readonly?: boolean;
	writeonly?: boolean;
	examples?: T[];
}

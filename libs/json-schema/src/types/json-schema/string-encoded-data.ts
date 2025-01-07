/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-a-vocabulary-for-the-conten
 */
export interface StringEncodedData<Schema = unknown> {
	contentMediaType?: string;
	contentEncoding?: string;
	contentSchema?: Schema | Schema[];
}

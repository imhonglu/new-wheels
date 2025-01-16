/**
 * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-8 | String Encoded Data}
 */
export interface StringEncodedData<Schema = unknown> {
	contentMediaType?: string;
	contentEncoding?: string;
	contentSchema?: Schema | Schema[];
}

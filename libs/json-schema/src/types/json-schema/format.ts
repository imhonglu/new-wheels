/**
 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-vocabularies-for-semantic-c
 */
export interface Format {
	format?:
		| "date-time"
		| "date"
		| "time"
		| "duration"
		| "email"
		| "hostname"
		| "idn-email"
		| "idn-hostname"
		| "ipv4"
		| "ipv6"
		| "iri"
		| "iri-reference"
		| "json-pointer"
		| "regex"
		| "relative-json-pointer"
		| "uri"
		| "uri-reference"
		| "uri-template"
		| "uuid";
}

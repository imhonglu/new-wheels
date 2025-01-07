export namespace StructuralValidation {
	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-type
	 */
	export type PrimitiveType =
		| "null"
		| "boolean"
		| "object"
		| "array"
		| "string"
		| "number"
		| "integer";

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-validation-keywords-for-any
	 */
	export interface Any {
		type?: PrimitiveType | PrimitiveType[];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const?: any;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		enum?: any[];
	}

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-validation-keywords-for-num
	 */
	export interface Numeric {
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: number;
		minimum?: number;
		exclusiveMinimum?: number;
	}

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-validation-keywords-for-str
	 */
	export interface String {
		maxLength?: number;
		minLength?: number;
		pattern?: string;
	}

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-validation-keywords-for-arr
	 */
	export interface Array {
		maxItems?: number;
		minItems?: number;
		uniqueItems?: boolean;
		maxContains?: number;
		minContains?: number;
	}

	/**
	 * @see https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-validation-keywords-for-obj
	 */
	export interface Object<T extends PropertyKey = string> {
		maxProperties?: number;
		minProperties?: number;
		required?: T[];
		dependentRequired?: {
			[key in T]: T[];
		};
	}

	export type All = Any & Object & Array & Numeric & String;
}

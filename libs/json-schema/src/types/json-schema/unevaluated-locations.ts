export namespace UnevaluatedLocations {
	/**
	 * @see {@link https://json-schema.org/draft/2020-12/json-schema-core#section-11.3 | Unevaluated Locations}
	 */
	export interface Object<Schema = unknown> {
		unevaluatedProperties?: Schema;
	}

	/**
	 * @see {@link https://json-schema.org/draft/2020-12/json-schema-core#section-11.2 | Unevaluated Locations}
	 */
	export interface Array<Schema = unknown> {
		unevaluatedItems?: Schema;
	}

	export type All<Schema = unknown> = Object<Schema> & Array<Schema>;
}

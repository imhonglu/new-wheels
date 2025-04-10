export namespace StructuralValidation {
  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.1.1 | Primitive Types}
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
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.1 | Any}
   */
  export interface Any {
    type?: PrimitiveType | [PrimitiveType, ...PrimitiveType[]];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const?: any;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    enum?: [any, ...any[]];
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.2 | Numeric}
   */
  export interface Numeric {
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.3 | String}
   */
  export interface String {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.4 | Array}
   */
  export interface Array {
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxContains?: number;
    minContains?: number;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.5 | Object}
   */
  export interface Object<T extends PropertyKey = string> {
    maxProperties?: number;
    minProperties?: number;
    required?: [T, ...T[]];
    dependentRequired?: {
      [key in T]: [T, ...T[]];
    };
  }

  export type All = Any & Object & Array & Numeric & String;
}

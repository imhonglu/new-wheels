export namespace ApplyingSubSchema {
  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#section-10.2.1 | Logic}
   */
  export interface Logic<Schema = unknown> {
    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#section-10.2.2 | Conditional}
   */
  export interface Conditional<Schema = unknown> {
    if?: Schema;
    then?: Schema;
    else?: Schema;
    dependentSchemas?: Record<string, Schema>;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#section-10.3.1 | Array}
   */
  export interface Array<Schema = unknown> {
    prefixItems?: Schema[];
    items?: Schema;
    contains?: Schema;
  }

  /**
   * @see {@link https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#section-10.3.2 | Object}
   */
  export interface Object<Schema = unknown> {
    properties?: Record<string, Schema>;
    patternProperties?: Record<string, Schema>;
    additionalProperties?: Schema;
    propertyNames?: Schema;
  }

  export type All<Schema = unknown> = Logic<Schema> &
    Conditional<Schema> &
    Array<Schema> &
    Object<Schema>;
}

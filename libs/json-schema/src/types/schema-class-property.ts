import { OriginalValueSymbol } from "../helpers/create-schema-class/create-schema-class.js";

export interface SchemaClassProperty<T = unknown> {
  [OriginalValueSymbol]: T;
}

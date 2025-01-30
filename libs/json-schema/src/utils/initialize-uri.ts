import type { Schema } from "../schema.js";
import { is } from "./is.js";

export function initializeUri(schema: Schema) {
  if (schema.parent) {
    return schema.parent.uri;
  }

  const { definition } = schema;
  if (!is.object(definition) || !definition.$id) {
    return;
  }

  const schemaUrl = new URL(definition.$id);
  const lastPathSegment = schemaUrl.pathname.split("/").pop();

  if (!lastPathSegment) {
    throw Error("Invalid $id: URL pathname must have at least one segment");
  }

  return definition.$id.replace(lastPathSegment, "");
}

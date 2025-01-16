import type { Schema } from "../schema.js";
import { is } from "./is.js";

export function initializeUri(schema: Schema) {
	if (schema.parent) {
		return schema.parent.uri;
	}

	const { schema: schemaDefinition } = schema;
	if (!is.object(schemaDefinition) || !schemaDefinition.$id) {
		return;
	}

	const schemaUrl = new URL(schemaDefinition.$id);
	const lastPathSegment = schemaUrl.pathname.split("/").pop();

	if (!lastPathSegment) {
		throw Error("Invalid $id: URL pathname must have at least one segment");
	}

	return schemaDefinition.$id.replace(lastPathSegment, "");
}

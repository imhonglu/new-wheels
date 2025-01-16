import { JsonPointer } from "@imhonglu/format";

export function encodeJsonPointer(pointer: PropertyKey) {
	return encodeURI(JsonPointer.escape(pointer.toString()));
}

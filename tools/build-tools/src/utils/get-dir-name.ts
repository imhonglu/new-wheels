import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function getDirname(meta?: ImportMeta) {
	if (!meta) {
		return __dirname;
	}
	return dirname(fileURLToPath(meta.url));
}

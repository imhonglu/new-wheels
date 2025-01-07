import { readdir, readlink } from "node:fs/promises";
import { join, relative } from "node:path";
import { resolvePath } from "./resolve-path.js";

export async function prepare() {
	const aliasMap: Record<string, string> = {};
	const vocabularyMap: Record<string, string[]> = {};

	for (const testsDirent of await readdir(
		resolvePath("root/repository/tests"),
		{
			withFileTypes: true,
		},
	)) {
		const absolutePath = join(testsDirent.parentPath, testsDirent.name);

		if (testsDirent.isDirectory()) {
			vocabularyMap[testsDirent.name] = await readdir(absolutePath, {
				withFileTypes: true,
				recursive: true,
			}).then((dirents) =>
				dirents
					.filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"))
					.map((dirent) =>
						join(
							relative(absolutePath, dirent.parentPath),
							dirent.name.replace(/\.json$/, ""),
						),
					),
			);
		} else if (testsDirent.isSymbolicLink()) {
			aliasMap[testsDirent.name] = await readlink(absolutePath);
		}
	}

	for (const alias in aliasMap) {
		const version = aliasMap[alias];

		if (vocabularyMap[version]) {
			vocabularyMap[alias] = vocabularyMap[version];
		}
	}

	return {
		alias: aliasMap,
		vocabulary: vocabularyMap,
	};
}

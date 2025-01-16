import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function getTestSuiteFilePaths(
	testSuitePath: string,
	exclude?: string[],
) {
	const dirents = await readdir(testSuitePath, {
		withFileTypes: true,
		recursive: true,
	});

	return dirents
		.filter(
			(dirent) =>
				dirent.isFile() &&
				dirent.name.endsWith(".json") &&
				!exclude?.includes(dirent.name),
		)
		.map((dirent) => join(dirent.parentPath, dirent.name));
}

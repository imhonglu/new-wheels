import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function getTestSuiteFilePaths(testSuitePath: string) {
	const dirents = await readdir(testSuitePath, {
		withFileTypes: true,
		recursive: true,
	});

	return dirents
		.filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"))
		.map((dirent) => join(dirent.parentPath, dirent.name));
}

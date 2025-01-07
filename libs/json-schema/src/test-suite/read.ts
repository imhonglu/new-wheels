import { readFile } from "node:fs/promises";
import type { Vocabulary } from "./generated/vocabulary.js";
import { resolvePath } from "./resolve-path.js";
import type { TestGroup } from "./types/test-group.js";

export async function read<T extends keyof Vocabulary = keyof Vocabulary>(
	version: T,
	keyword: Vocabulary[T],
): Promise<TestGroup[]> {
	return readFile(
		resolvePath("root/repository/tests", version, `${keyword}.json`),
		"utf-8",
	).then(JSON.parse);
}

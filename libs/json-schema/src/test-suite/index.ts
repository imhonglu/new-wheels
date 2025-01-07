import { generate } from "./generate.js";
import { prepare } from "./prepare.js";
import { read } from "./read.js";

export * from "./generated/vocabulary.js";
export * from "./generated/alias.js";
export * from "./generated/version.js";
export * from "./types/test-group.js";
export * from "./types/test-case.js";

export const testSuite = {
	read,
	prepare,
	generate,
};

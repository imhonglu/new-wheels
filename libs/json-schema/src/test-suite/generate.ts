import { writeFile } from "node:fs/promises";
import {
	createInterface,
	createType,
	gitFetch,
	printNode,
} from "@imhonglu/build-tools";
import { kebabCase } from "@imhonglu/toolkit";
import ts from "typescript";
import { GIT_OPTIONS } from "./constants.js";
import { prepare } from "./prepare.js";
import { resolvePath } from "./resolve-path.js";

async function writeTsFile(
	content:
		| ts.InterfaceDeclaration
		| ts.TypeAliasDeclaration
		| ts.VariableStatement,
	options?: { fileName?: string },
) {
	const fileName =
		!options?.fileName && ts.isDeclarationStatement(content)
			? kebabCase(content.name.escapedText as string)
			: options?.fileName;

	if (!fileName) {
		throw new Error("fileName is required");
	}

	const filePath = resolvePath("root/generated", `${fileName}.ts`);
	await writeFile(filePath, printNode(content));
	console.info(`Generated File: ${filePath}`);
}

export async function generate() {
	await gitFetch({
		...GIT_OPTIONS,
		cwd: resolvePath("root/repository"),
	});

	const { vocabulary, alias } = await prepare();

	await writeTsFile(createInterface("Vocabulary", vocabulary));
	await writeTsFile(createInterface("Alias", alias));
	await writeTsFile(createType("Version", Object.keys(vocabulary)));
}

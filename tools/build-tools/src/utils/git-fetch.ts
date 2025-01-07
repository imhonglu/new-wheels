import { join, resolve } from "node:path";
import { safeSh as $ } from "./sh.js";

export interface GitOptions {
	org: string;
	repo: string;
	branch?: string;
	cwd?: string;
}

export async function gitFetch({
	org,
	repo,
	branch = "main",
	cwd = join(resolve(), repo),
}: GitOptions) {
	const cloneResult = await $(
		"git clone",
		`https://github.com/${org}/${repo}.git`,
		cwd,
	);

	if ((!cloneResult.ok && cloneResult.error.code !== 128) || !cloneResult.ok) {
		throw cloneResult;
	}

	const fetchResult = await $(`git -C ${cwd}/.git`, "fetch", "origin", branch);

	if (!fetchResult.ok) {
		throw fetchResult;
	}

	return cwd;
}

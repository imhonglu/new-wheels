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
	const dirname = join(cwd, repo);

	const cloneResult = await $(
		"git clone",
		`https://github.com/${org}/${repo}.git`,
		dirname,
	);

	if (!cloneResult.ok) {
		if (cloneResult.error.code !== 128) {
			throw new Error(`Git clone failed for ${org}/${repo}`, {
				cause: cloneResult.error,
			});
		}
	}

	const fetchResult = await $(
		`git -C ${dirname}/.git`,
		"fetch",
		"origin",
		branch,
	);

	if (!fetchResult.ok) {
		throw new Error(`Git fetch failed for ${org}/${repo} (${branch})`, {
			cause: fetchResult.error,
		});
	}

	return dirname;
}

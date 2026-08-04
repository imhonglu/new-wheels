import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

export type GitRunner = (args: readonly string[]) => string;

export interface SyncTestSuiteOptions {
  cacheDirectory: string;
  repository: string;
  revision: string;
  runGit?: GitRunner;
}

function runGitCommand(args: readonly string[]): string {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });

  if (result.error) {
    throw new Error(`Unable to run git ${args[0]}`, { cause: result.error });
  }

  if (result.status !== 0) {
    throw new Error(`git ${args[0]} failed with exit code ${result.status}`);
  }

  return result.stdout.trim();
}

/**
 * Synchronizes a disposable Git checkout to one exact upstream revision.
 *
 * The checkout is forcibly reset and cleaned, so callers must provide a
 * dedicated cache directory that contains no user-owned files.
 *
 * @returns The checked-out revision.
 * @throws If a Git command fails or the resulting revision differs.
 */
export async function syncTestSuite({
  cacheDirectory,
  repository,
  revision,
  runGit = runGitCommand,
}: SyncTestSuiteOptions): Promise<string> {
  if (!existsSync(join(cacheDirectory, ".git"))) {
    await mkdir(dirname(cacheDirectory), { recursive: true });
    runGit(["clone", "--no-checkout", repository, cacheDirectory]);
  }

  runGit(["-C", cacheDirectory, "config", "core.autocrlf", "false"]);
  runGit(["-C", cacheDirectory, "config", "core.eol", "lf"]);
  runGit(["-C", cacheDirectory, "fetch", "--depth=1", "origin", revision]);
  runGit(["-C", cacheDirectory, "checkout", "--force", "FETCH_HEAD"]);
  runGit(["-C", cacheDirectory, "clean", "-ffdx"]);

  const checkedOutRevision = runGit([
    "-C",
    cacheDirectory,
    "rev-parse",
    "HEAD",
  ]);

  if (checkedOutRevision !== revision) {
    throw new Error(
      `Expected JSON-Schema-Test-Suite ${revision}, received ${checkedOutRevision}`,
    );
  }

  return checkedOutRevision;
}

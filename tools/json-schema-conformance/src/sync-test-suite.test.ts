import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vitest";
import { type GitRunner, syncTestSuite } from "./sync-test-suite.js";

const revision = "a".repeat(40);
const temporaryDirectories: string[] = [];

async function temporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "json-schema-suite-sync-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

test("clones and resets a new disposable checkout", async () => {
  const root = await temporaryDirectory();
  const cacheDirectory = join(root, "cache", "suite");
  const commands: readonly string[][] = [];
  const runGit: GitRunner = vi.fn((args) => {
    commands.push([...args]);
    return args.at(-2) === "rev-parse" ? revision : "";
  });

  await expect(
    syncTestSuite({
      cacheDirectory,
      repository: "https://example.com/suite.git",
      revision,
      runGit,
    }),
  ).resolves.toBe(revision);

  expect(commands).toEqual([
    ["clone", "--no-checkout", "https://example.com/suite.git", cacheDirectory],
    ["-C", cacheDirectory, "config", "core.autocrlf", "false"],
    ["-C", cacheDirectory, "config", "core.eol", "lf"],
    ["-C", cacheDirectory, "fetch", "--depth=1", "origin", revision],
    ["-C", cacheDirectory, "checkout", "--force", "FETCH_HEAD"],
    ["-C", cacheDirectory, "clean", "-ffdx"],
    ["-C", cacheDirectory, "rev-parse", "HEAD"],
  ]);
});

test("reuses an existing checkout without cloning", async () => {
  const root = await temporaryDirectory();
  const cacheDirectory = join(root, "suite");
  await mkdir(join(cacheDirectory, ".git"), { recursive: true });
  const runGit = vi.fn<GitRunner>((args) =>
    args.at(-2) === "rev-parse" ? revision : "",
  );

  await syncTestSuite({
    cacheDirectory,
    repository: "unused",
    revision,
    runGit,
  });

  expect(runGit).not.toHaveBeenCalledWith(expect.arrayContaining(["clone"]));
  expect(runGit).toHaveBeenCalledTimes(6);
});

test("rejects a checkout at a different revision", async () => {
  const root = await temporaryDirectory();
  const runGit: GitRunner = (args) =>
    args.at(-2) === "rev-parse" ? "b".repeat(40) : "";

  await expect(
    syncTestSuite({
      cacheDirectory: join(root, "suite"),
      repository: "https://example.com/suite.git",
      revision,
      runGit,
    }),
  ).rejects.toThrow(`Expected JSON-Schema-Test-Suite ${revision}`);
});

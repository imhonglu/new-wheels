import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";

const temporaryDirectories: string[] = [];
const cli = fileURLToPath(
  new URL("./check-markdown-links.cli.ts", import.meta.url),
);

function createTemporaryDirectory(): string {
  const directory = mkdtempSync(join(tmpdir(), "new-wheels-cli-tools-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }

  temporaryDirectories.length = 0;
});

function runCli(...inputs: string[]) {
  return spawnSync(process.execPath, [cli, ...inputs], {
    encoding: "utf8",
  });
}

test("fails when no input is provided", () => {
  const result = runCli();

  expect(result.status).toBe(1);
  expect(result.stderr.trim()).toBe(
    "Provide at least one Markdown file or directory",
  );
});

test("returns missing local Markdown link targets", () => {
  const directory = createTemporaryDirectory();
  const readme = join(directory, "README.md");

  writeFileSync(join(directory, "guide.md"), "# Guide\n");
  writeFileSync(
    readme,
    [
      "[Guide](./guide.md)",
      "[Missing](./missing.md)",
      "[Section](#section)",
      "[Website](https://example.com)",
    ].join("\n"),
  );

  const result = runCli(readme);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain("Broken Markdown links:");
  expect(result.stderr).toContain(`${resolve(readme)}: ./missing.md`);
});

test("rejects local targets with different filename casing", () => {
  const directory = createTemporaryDirectory();
  const readme = join(directory, "README.md");

  writeFileSync(join(directory, "guide.md"), "# Guide\n");
  writeFileSync(readme, "[Guide](./Guide.md)\n");

  const result = runCli(readme);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain(`${resolve(readme)}: ./Guide.md`);
});

test("ignores generated and source directories while traversing", () => {
  const directory = createTemporaryDirectory();

  writeFileSync(join(directory, "README.md"), "[Missing](./missing.md)\n");

  for (const ignoredDirectory of [
    "assets",
    "dist",
    "docs",
    "node_modules",
    "src",
    "temp",
  ]) {
    const path = join(directory, ignoredDirectory);
    mkdirSync(path);
    writeFileSync(join(path, "ignored.md"), "[Missing](./missing.md)\n");
  }

  const result = runCli(directory);

  expect(result.status).toBe(1);
  expect(result.stderr.trim()).toBe(
    `Broken Markdown links:\n${resolve(directory, "README.md")}: ./missing.md`,
  );
});

test("succeeds when all local link targets exist", () => {
  const directory = createTemporaryDirectory();
  const readme = join(directory, "README.md");

  writeFileSync(join(directory, "guide.md"), "# Guide\n");
  writeFileSync(readme, "[Guide](./guide.md)\n");

  const result = runCli(readme);

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
});

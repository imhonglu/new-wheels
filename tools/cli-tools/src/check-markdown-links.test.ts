import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, expect, test } from "vitest";
import { findBrokenMarkdownLinks } from "./check-markdown-links.js";

const temporaryDirectories: string[] = [];

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

test("requires at least one input", () => {
  expect(() => findBrokenMarkdownLinks([])).toThrow(
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

  expect(findBrokenMarkdownLinks([readme])).toEqual([
    `${resolve(readme)}: ./missing.md`,
  ]);
});

test("rejects local targets with different filename casing", () => {
  const directory = createTemporaryDirectory();
  const readme = join(directory, "README.md");

  writeFileSync(join(directory, "guide.md"), "# Guide\n");
  writeFileSync(readme, "[Guide](./Guide.md)\n");

  expect(findBrokenMarkdownLinks([readme])).toEqual([
    `${resolve(readme)}: ./Guide.md`,
  ]);
});

test("ignores generated and source directories while traversing", () => {
  const directory = createTemporaryDirectory();

  writeFileSync(join(directory, "README.md"), "[Missing](./missing.md)\n");

  for (const ignoredDirectory of [
    ".cache",
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

  expect(findBrokenMarkdownLinks([directory])).toEqual([
    `${resolve(directory, "README.md")}: ./missing.md`,
  ]);
});

test("accepts existing local link targets", () => {
  const directory = createTemporaryDirectory();
  const readme = join(directory, "README.md");

  writeFileSync(join(directory, "guide.md"), "# Guide\n");
  writeFileSync(readme, "[Guide](./guide.md)\n");

  expect(findBrokenMarkdownLinks([readme])).toEqual([]);
});

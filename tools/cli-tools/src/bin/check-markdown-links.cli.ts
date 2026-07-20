#!/usr/bin/env node
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";

const ignoredDirectories = new Set([
  "assets",
  "dist",
  "docs",
  "node_modules",
  "src",
  "temp",
]);
const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;

function existsWithExactCase(path: string): boolean {
  if (!existsSync(path)) {
    return false;
  }

  const parent = dirname(path);

  if (parent === path) {
    return true;
  }

  return (
    existsWithExactCase(parent) &&
    readdirSync(parent).some((entry) => entry === basename(path))
  );
}

function collectMarkdownFiles(path: string): string[] {
  const absolutePath = resolve(path);

  if (!existsSync(absolutePath)) {
    throw new Error(`Path does not exist: ${path}`);
  }

  if (!lstatSync(absolutePath).isDirectory()) {
    return extname(absolutePath) === ".md" ? [absolutePath] : [];
  }

  return readdirSync(absolutePath, { withFileTypes: true })
    .filter(
      (entry) => !entry.isDirectory() || !ignoredDirectories.has(entry.name),
    )
    .flatMap((entry) =>
      collectMarkdownFiles(resolve(absolutePath, entry.name)),
    );
}

function findBrokenMarkdownLinks(inputs: readonly string[]): string[] {
  if (inputs.length === 0) {
    throw new Error("Provide at least one Markdown file or directory");
  }

  const failures: string[] = [];

  for (const file of inputs.flatMap(collectMarkdownFiles)) {
    const source = readFileSync(file, "utf8");

    for (const match of source.matchAll(markdownLink)) {
      const link = match[1].trim().replace(/^<|>$/g, "");

      if (
        link.length === 0 ||
        link.startsWith("#") ||
        /^[a-z][a-z\d+.-]*:/i.test(link)
      ) {
        continue;
      }

      const path = decodeURIComponent(link.split("#", 1)[0]);
      const target = resolve(dirname(file), path);

      if (!existsWithExactCase(target)) {
        failures.push(`${file}: ${link}`);
      }
    }
  }

  return failures;
}

try {
  const failures = findBrokenMarkdownLinks(process.argv.slice(2));

  if (failures.length > 0) {
    console.error(`Broken Markdown links:\n${failures.join("\n")}`);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

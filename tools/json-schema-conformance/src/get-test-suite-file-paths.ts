import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

function normalizePath(path: string): string {
  return path.split(sep).join("/");
}

export async function getTestSuiteFilePaths(
  testSuiteDirectory: string,
  exclude: string[] = [],
): Promise<string[]> {
  const excludedPaths = new Set(exclude.map(normalizePath));
  const entries = await readdir(testSuiteDirectory, {
    withFileTypes: true,
    recursive: true,
  });

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => join(entry.parentPath, entry.name));
  const relativePaths = new Set(
    files.map((path) => normalizePath(relative(testSuiteDirectory, path))),
  );

  for (const excludedPath of excludedPaths) {
    if (!relativePaths.has(excludedPath)) {
      throw new Error(`Excluded suite file does not exist: ${excludedPath}`);
    }
  }

  return files
    .filter(
      (path) =>
        !excludedPaths.has(normalizePath(relative(testSuiteDirectory, path))),
    )
    .sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
}

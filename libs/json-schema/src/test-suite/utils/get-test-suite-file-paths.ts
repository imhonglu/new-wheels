import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

export async function getTestSuiteFilePaths(
  testSuitePath: string,
  exclude?: string[],
) {
  const direntList = await readdir(testSuitePath, {
    withFileTypes: true,
    recursive: true,
  });

  const excludeSet = new Set(exclude);

  return direntList
    .filter((dirent) => {
      const parent = relative(testSuitePath, dirent.parentPath);
      const name = join(parent, dirent.name);

      return (
        dirent.isFile() &&
        dirent.name.endsWith(".json") &&
        !excludeSet.has(name)
      );
    })
    .map((dirent) => join(dirent.parentPath, dirent.name));
}

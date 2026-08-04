import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { SuiteLock } from "./types.js";

export const packageRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);

export const suiteCacheDirectory = join(
  packageRoot,
  ".cache",
  "JSON-Schema-Test-Suite",
);

export const generatedDirectory = join(packageRoot, "generated");

export function parseSuiteLock(source: string): SuiteLock {
  const lock = JSON.parse(source) as Partial<SuiteLock>;

  if (
    typeof lock.repository !== "string" ||
    !/^[a-f\d]{40}$/.test(lock.revision ?? "") ||
    typeof lock.draft !== "string" ||
    !Array.isArray(lock.exclude) ||
    lock.exclude.some((entry) => typeof entry !== "string")
  ) {
    throw new Error("Invalid suite-lock.json");
  }

  return lock as SuiteLock;
}

export async function loadSuiteLock(): Promise<SuiteLock> {
  return parseSuiteLock(
    await readFile(join(packageRoot, "suite-lock.json"), "utf8"),
  );
}

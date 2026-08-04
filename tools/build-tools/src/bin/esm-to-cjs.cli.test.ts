import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";

const temporaryDirectories: string[] = [];
const cli = fileURLToPath(
  new URL("../../dist/bin/esm-to-cjs.cli.js", import.meta.url),
);

function createTemporaryDirectory(): string {
  const directory = mkdtempSync(join(tmpdir(), "new-wheels-build-tools-"));
  temporaryDirectories.push(directory);
  return directory;
}

function runCli(directory: string) {
  return spawnSync(process.execPath, [cli], {
    cwd: directory,
    encoding: "utf8",
  });
}

afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }

  temporaryDirectories.length = 0;
});

test("runs the compiled CLI", () => {
  const directory = createTemporaryDirectory();
  const result = runCli(directory);

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
});

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";

const temporaryDirectories: string[] = [];
const cli = fileURLToPath(new URL("./esm-to-cjs.cli.ts", import.meta.url));

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

test("succeeds when the dist directory does not exist", () => {
  const directory = createTemporaryDirectory();
  const result = runCli(directory);

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
});

test("creates CommonJS files for ESM build outputs", () => {
  const directory = createTemporaryDirectory();
  const dist = join(directory, "dist");
  const output = join(dist, "index.cjs");

  mkdirSync(dist);
  writeFileSync(join(dist, "index.js"), "export const value = 1;\n");

  const result = runCli(directory);

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
  expect(existsSync(output)).toBe(true);

  const execution = spawnSync(
    process.execPath,
    ["-e", "process.stdout.write(String(require('./dist/index.cjs').value))"],
    { cwd: directory, encoding: "utf8" },
  );

  expect(execution.status).toBe(0);
  expect(execution.stdout).toBe("1");
});

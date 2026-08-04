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
import { afterEach, expect, test } from "vitest";
import { convertEsmToCjs } from "./convert-esm-to-cjs.js";

const temporaryDirectories: string[] = [];

function createTemporaryDirectory(): string {
  const directory = mkdtempSync(join(tmpdir(), "new-wheels-build-tools-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }

  temporaryDirectories.length = 0;
});

test("does nothing when the dist directory does not exist", async () => {
  await expect(convertEsmToCjs(createTemporaryDirectory())).resolves.toBe(
    false,
  );
});

test("creates CommonJS files for ESM build outputs", async () => {
  const directory = createTemporaryDirectory();
  const dist = join(directory, "dist");
  const output = join(dist, "index.cjs");

  mkdirSync(dist);
  writeFileSync(join(dist, "index.js"), "export const value = 1;\n");

  await expect(convertEsmToCjs(directory)).resolves.toBe(true);
  expect(existsSync(output)).toBe(true);

  const execution = spawnSync(
    process.execPath,
    ["-e", "process.stdout.write(String(require('./dist/index.cjs').value))"],
    { cwd: directory, encoding: "utf8" },
  );

  expect(execution.status).toBe(0);
  expect(execution.stdout).toBe("1");
});

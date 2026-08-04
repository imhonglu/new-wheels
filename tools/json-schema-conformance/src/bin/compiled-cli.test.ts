import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

test.each([
  "check-failure-baseline.cli.js",
  "generate-tests.cli.js",
  "sync-suite.cli.js",
])("emits a valid compiled CLI: %s", (name) => {
  const cli = fileURLToPath(new URL(`../../dist/bin/${name}`, import.meta.url));
  const result = spawnSync(process.execPath, ["--check", cli], {
    encoding: "utf8",
  });

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
});

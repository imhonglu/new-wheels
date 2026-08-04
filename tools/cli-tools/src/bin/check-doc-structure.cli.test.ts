import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const cli = fileURLToPath(
  new URL("../../dist/bin/check-doc-structure.cli.js", import.meta.url),
);

test("runs the compiled CLI", () => {
  const result = spawnSync(process.execPath, [cli, "missing-docs"], {
    encoding: "utf8",
  });

  expect(result.status).toBe(1);
  expect(result.stderr).toContain("Documentation directory does not exist:");
});

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const cli = fileURLToPath(
  new URL("../../dist/bin/check-markdown-links.cli.js", import.meta.url),
);

function runCli(...inputs: string[]) {
  return spawnSync(process.execPath, [cli, ...inputs], {
    encoding: "utf8",
  });
}

test("runs the compiled CLI", () => {
  const result = runCli();

  expect(result.status).toBe(1);
  expect(result.stderr.trim()).toBe(
    "Provide at least one Markdown file or directory",
  );
});

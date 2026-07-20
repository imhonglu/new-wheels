import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, expect, test } from "vitest";

const temporaryDirectories: string[] = [];
const cli = fileURLToPath(
  new URL("./check-doc-structure.cli.ts", import.meta.url),
);

function createFixture() {
  const root = mkdtempSync(join(tmpdir(), "new-wheels-doc-structure-"));
  const docs = join(root, "docs");
  temporaryDirectories.push(root);

  write(docs, "README.md", [
    "[Architecture](./architecture/README.md)",
    "[Decisions](./decisions/README.md)",
    "[Harness](./engineering-harness.md)",
    "[Plans](./plans/README.md)",
  ]);
  write(docs, "engineering-harness.md", currentDocument("# Harness"));
  write(docs, "architecture/README.md", "[Policy](./policy.md)");
  write(docs, "architecture/policy.md", currentDocument("# Policy"));
  write(docs, "decisions/README.md", "[Decision](./0001-use-source-docs.md)");
  write(
    docs,
    "decisions/0001-use-source-docs.md",
    [
      "# Decision",
      "",
      "- Status: Accepted",
      "- Date: 2026-07-21",
      "- Supersedes: None",
      "- Superseded by: None",
    ].join("\n"),
  );
  write(docs, "plans/README.md", "[Plan](./2026-07-21-document-api.md)");
  write(
    docs,
    "plans/2026-07-21-document-api.md",
    [
      "# Plan",
      "",
      "- Status: Active",
      "- Started: 2026-07-21",
      "- Closed: N/A",
      "- Scope: docs",
      "",
      "## 성공 기준",
      "## 단계",
      "## 결정 기록",
      "## 진행 기록",
      "## 종료 결과",
    ].join("\n"),
  );

  return docs;
}

function currentDocument(title: string) {
  return [
    title,
    "",
    "- Status: Active",
    "- Last verified: 2026-07-21",
    "- Verified against: `package.json`",
  ].join("\n");
}

function write(root: string, path: string, source: string | string[]) {
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, Array.isArray(source) ? source.join("\n") : source);
}

function runCli(docs: string) {
  return spawnSync(process.execPath, [cli, docs], { encoding: "utf8" });
}

afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }

  temporaryDirectories.length = 0;
});

test("accepts indexed documents with valid metadata", () => {
  const result = runCli(createFixture());

  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
});

test("rejects documents missing from the nearest index", () => {
  const docs = createFixture();
  write(docs, "architecture/unlisted.md", currentDocument("# Unlisted"));

  const result = runCli(docs);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain("missing index link ./unlisted.md");
});

test("rejects invalid current-document metadata", () => {
  const docs = createFixture();
  write(docs, "architecture/policy.md", "# Policy\n");

  const result = runCli(docs);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain("Status must be Active");
  expect(result.stderr).toContain("missing or invalid Last verified date");
});

test("rejects invalid ADR and Plan lifecycle metadata", () => {
  const docs = createFixture();
  write(
    docs,
    "decisions/0001-use-source-docs.md",
    "# Decision\n\n- Status: Unknown\n",
  );
  write(
    docs,
    "plans/2026-07-21-document-api.md",
    "# Plan\n\n- Status: Completed\n- Started: 2026-07-21\n- Closed: N/A\n",
  );

  const result = runCli(docs);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain("invalid ADR Status");
  expect(result.stderr).toContain("invalid Closed value for Completed status");
  expect(result.stderr).toContain("missing section 종료 결과");
});

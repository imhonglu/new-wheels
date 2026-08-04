import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, expect, test } from "vitest";
import { findDocumentationStructureErrors } from "./check-doc-structure.js";

const temporaryDirectories: string[] = [];

function createFixture(): string {
  const root = mkdtempSync(join(tmpdir(), "new-wheels-doc-structure-"));
  const docs = join(root, "docs");
  temporaryDirectories.push(root);

  write(docs, "README.md", [
    "[Architecture](./architecture/README.md)",
    "[Decisions](./decisions/README.md)",
    "[Plans](./plans/README.md)",
  ]);
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
  write(
    docs,
    "plans/README.md",
    "| [Plan](./2026-07-21-document-api.md) | docs |",
  );
  write(
    docs,
    "plans/2026-07-21-document-api.md",
    [
      "# Plan",
      "",
      "- Started: 2026-07-21",
      "- Scope: docs",
      "",
      "## 성공 기준",
      "## 단계",
      "## 결정 기록",
      "## 진행 기록",
    ].join("\n"),
  );

  return docs;
}

function currentDocument(title: string): string {
  return [
    title,
    "",
    "- Last verified: 2026-07-21",
    "- Verified against: `package.json`",
  ].join("\n");
}

function planDocument(): string {
  return [
    "# Plan",
    "",
    "- Started: 2026-07-21",
    "- Scope: docs",
    "",
    "## 성공 기준",
    "",
    "완료 조건",
    "",
    "## 단계",
    "",
    "- [ ] 작업",
    "",
    "## 결정 기록",
    "",
    "결정",
    "",
    "## 진행 기록",
    "",
    "진행",
  ].join("\n");
}

function write(root: string, path: string, source: string | string[]): void {
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, Array.isArray(source) ? source.join("\n") : source);
}

afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { recursive: true, force: true });
  }

  temporaryDirectories.length = 0;
});

test("accepts indexed documents with valid metadata", () => {
  expect(findDocumentationStructureErrors(createFixture())).toEqual([]);
});

test.each(["Invalid.md", "policy_name.md", "policy--name.md"])(
  "rejects non-kebab-case current-document filename %s",
  (name) => {
    const docs = createFixture();
    write(docs, "architecture/README.md", [
      "[Policy](./policy.md)",
      `[Invalid](./${name})`,
    ]);
    write(docs, `architecture/${name}`, currentDocument("# Invalid"));

    expect(findDocumentationStructureErrors(docs)).toContain(
      `architecture/${name}: filename must use lowercase kebab-case`,
    );
  },
);

test("requires exactly one H1 on current documents", () => {
  const docs = createFixture();

  for (const title of ["## Policy", "#   "]) {
    write(docs, "architecture/policy.md", currentDocument(title));

    expect(findDocumentationStructureErrors(docs)).toContain(
      "architecture/policy.md: must contain exactly one non-empty H1 heading",
    );
  }

  write(
    docs,
    "architecture/policy.md",
    `${currentDocument("# Policy")}\n\n# Duplicate`,
  );

  expect(findDocumentationStructureErrors(docs)).toContain(
    "architecture/policy.md: must contain exactly one non-empty H1 heading",
  );
});

test("ignores H1 examples in fenced code on current documents", () => {
  const docs = createFixture();
  write(
    docs,
    "architecture/policy.md",
    `${currentDocument("# Policy")}\n\n\`\`\`md\n# Example\n\`\`\``,
  );

  expect(findDocumentationStructureErrors(docs)).toEqual([]);
});

test("rejects documents missing from the nearest index", () => {
  const docs = createFixture();
  write(docs, "architecture/unlisted.md", currentDocument("# Unlisted"));

  expect(findDocumentationStructureErrors(docs)).toContain(
    "architecture/README.md: missing index link ./unlisted.md",
  );
});

test("does not accept index links from fenced code", () => {
  const docs = createFixture();
  write(docs, "architecture/README.md", [
    "[Policy](./policy.md)",
    "",
    "```md",
    "[Unlisted](./unlisted.md)",
    "```",
  ]);
  write(docs, "architecture/unlisted.md", currentDocument("# Unlisted"));

  expect(findDocumentationStructureErrors(docs)).toContain(
    "architecture/README.md: missing index link ./unlisted.md",
  );
});

test("rejects invalid current-document metadata", () => {
  const docs = createFixture();
  write(docs, "architecture/policy.md", "# Policy\n");

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "architecture/policy.md: missing or invalid Last verified date",
  );
  expect(errors).toContain("architecture/policy.md: missing Verified against");
});

test("rejects Status metadata on current documents regardless of its value", () => {
  for (const directory of ["architecture", "guides", "operations"]) {
    for (const status of ["- Status: Active", "- Status:"]) {
      const docs = createFixture();

      if (directory !== "architecture") {
        write(
          docs,
          "README.md",
          `${readFileSync(join(docs, "README.md"), "utf8")}\n[Current](./${directory}/README.md)`,
        );
        write(docs, `${directory}/README.md`, "[Policy](./policy.md)");
      }

      write(
        docs,
        `${directory}/policy.md`,
        `${currentDocument("# Policy")}\n${status}`,
      );

      expect(findDocumentationStructureErrors(docs)).toContain(
        `${directory}/policy.md: Status metadata is only valid for ADRs`,
      );
    }
  }
});

test("ignores Status examples in fenced code on current documents", () => {
  const docs = createFixture();
  write(
    docs,
    "architecture/policy.md",
    `${currentDocument("# Policy")}\n\n\`\`\`md\n- Status: Active\n\`\`\``,
  );

  expect(findDocumentationStructureErrors(docs)).toEqual([]);
});

test("does not accept current-document metadata from fenced code", () => {
  const docs = createFixture();
  write(docs, "architecture/policy.md", [
    "# Policy",
    "",
    "```md",
    "- Last verified: 2026-07-21",
    "- Verified against: `package.json`",
    "```",
  ]);

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "architecture/policy.md: missing or invalid Last verified date",
  );
  expect(errors).toContain("architecture/policy.md: missing Verified against");
});

test("rejects duplicate current-document metadata", () => {
  const docs = createFixture();
  write(docs, "architecture/policy.md", [
    currentDocument("# Policy"),
    "- Last verified: 2026-07-21",
    "- Verified against: `package.json`",
  ]);

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "architecture/policy.md: missing or invalid Last verified date",
  );
  expect(errors).toContain("architecture/policy.md: missing Verified against");
});

test("checks current-document metadata in nested directories", () => {
  const docs = createFixture();
  write(docs, "architecture/README.md", [
    "[Policy](./policy.md)",
    "[Nested](./nested/README.md)",
  ]);
  write(docs, "architecture/nested/README.md", "[Policy](./policy.md)");
  write(docs, "architecture/nested/policy.md", "# Nested policy\n");

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "architecture/nested/policy.md: missing or invalid Last verified date",
  );
  expect(errors).toContain(
    "architecture/nested/policy.md: missing Verified against",
  );
});

test("rejects invalid ADR status", () => {
  const docs = createFixture();
  write(
    docs,
    "decisions/0001-use-source-docs.md",
    "# Decision\n\n- Status: Unknown\n",
  );

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: invalid ADR Status",
  );
});

test("does not accept ADR metadata from fenced code", () => {
  const docs = createFixture();
  write(docs, "decisions/0001-use-source-docs.md", [
    "# Decision",
    "",
    "```md",
    "- Status: Accepted",
    "- Date: 2026-07-21",
    "- Supersedes: None",
    "- Superseded by: None",
    "```",
  ]);

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: invalid ADR Status",
  );
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: missing or invalid ADR Date",
  );
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: Supersedes must be None or a relative ADR link",
  );
});

test("rejects duplicate ADR metadata", () => {
  const docs = createFixture();
  const metadata = [
    "- Status: Accepted",
    "- Date: 2026-07-21",
    "- Supersedes: None",
    "- Superseded by: None",
  ];
  write(docs, "decisions/0001-use-source-docs.md", [
    "# Decision",
    "",
    ...metadata,
    ...metadata,
  ]);

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: invalid ADR Status",
  );
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: missing or invalid ADR Date",
  );
  expect(errors).toContain(
    "decisions/0001-use-source-docs.md: Supersedes must be None or a relative ADR link",
  );
});

test("rejects Status and Closed metadata on Plans regardless of value", () => {
  for (const metadata of [
    "- Status: Active",
    "- Status: Unknown",
    "- Status:",
    "- Closed: 2026-07-22",
    "- Closed:",
  ]) {
    const docs = createFixture();
    write(
      docs,
      "plans/2026-07-21-document-api.md",
      `${planDocument()}\n${metadata}`,
    );

    const expected = metadata.startsWith("- Status:")
      ? "plans/2026-07-21-document-api.md: Status metadata is not allowed on Plans"
      : "plans/2026-07-21-document-api.md: Closed metadata is not allowed on Plans";
    expect(findDocumentationStructureErrors(docs)).toContain(expected);
  }
});

test("rejects subdirectories under plans even when they contain only an index", () => {
  const docs = createFixture();
  write(docs, "plans/README.md", [
    "| [Plan](./2026-07-21-document-api.md) | docs |",
    "[Nested](./nested/README.md)",
  ]);
  write(docs, "plans/nested/README.md", "# Nested");

  expect(findDocumentationStructureErrors(docs)).toContain(
    "plans/nested: subdirectories are not allowed under plans/",
  );
});

test("requires each Plan exactly once in a two-column Plan table row", () => {
  const docs = createFixture();
  const row = "| [Plan](./2026-07-21-document-api.md) | docs |";
  write(docs, "plans/README.md", `${row}\n${row}`);

  expect(findDocumentationStructureErrors(docs)).toContain(
    "plans/README.md: ./2026-07-21-document-api.md must appear exactly once in the Plan table",
  );

  for (const invalidIndex of [
    "[Plan](./2026-07-21-document-api.md)",
    "| [Plan](./2026-07-21-document-api.md) | |",
    "| [Plan](./2026-07-21-document-api.md) | docs | extra |",
    `\`\`\`md\n${row}\n\`\`\``,
  ]) {
    write(docs, "plans/README.md", invalidIndex);

    expect(findDocumentationStructureErrors(docs)).toContain(
      "plans/README.md: ./2026-07-21-document-api.md must appear exactly once in the Plan table",
    );
  }
});

test("does not throw when a plans index is missing", () => {
  const docs = createFixture();
  rmSync(join(docs, "plans/README.md"));

  expect(() => findDocumentationStructureErrors(docs)).not.toThrow();
  expect(findDocumentationStructureErrors(docs)).toContain(
    "plans: missing README.md index",
  );
});

test("requires Plan Started and Scope metadata", () => {
  const docs = createFixture();
  const source = planDocument()
    .replace("- Started: 2026-07-21\n", "")
    .replace("- Scope: docs", "- Scope:");
  write(docs, "plans/2026-07-21-document-api.md", source);

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "plans/2026-07-21-document-api.md: Started must match the filename date",
  );
  expect(errors).toContain(
    "plans/2026-07-21-document-api.md: missing or invalid Scope",
  );
});

test("requires exact H2 Plan sections outside fenced code", () => {
  const docs = createFixture();
  write(
    docs,
    "plans/2026-07-21-document-api.md",
    `${planDocument().replace("## 단계", "### 단계")}\n\n\`\`\`md\n## 단계\n## 종료 결과\n\`\`\``,
  );

  const errors = findDocumentationStructureErrors(docs);
  expect(errors).toContain(
    "plans/2026-07-21-document-api.md: missing section 단계",
  );
  expect(errors).not.toContain(
    "plans/2026-07-21-document-api.md: section 종료 결과 is not allowed on Plans",
  );
});

test("rejects an exact closing H2 but ignores fenced and H3 examples", () => {
  const docs = createFixture();
  write(
    docs,
    "plans/2026-07-21-document-api.md",
    `${planDocument()}\n\n## 종료 결과\n`,
  );

  expect(findDocumentationStructureErrors(docs)).toContain(
    "plans/2026-07-21-document-api.md: section 종료 결과 is not allowed on Plans",
  );

  write(
    docs,
    "plans/2026-07-21-document-api.md",
    `${planDocument()}\n\n### 종료 결과\n\n\`\`\`md\n- Status: Active\n- Closed: 2026-07-22\n## 종료 결과\n\`\`\``,
  );

  expect(findDocumentationStructureErrors(docs)).toEqual([]);
});

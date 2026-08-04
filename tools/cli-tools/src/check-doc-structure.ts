import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;
const currentDocumentDirectories = new Set([
  "architecture",
  "guides",
  "operations",
]);

function read(path: string): string {
  return readFileSync(path, "utf8");
}

function markdownFilePaths(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return markdownFilePaths(path);
      }

      return entry.name.endsWith(".md") && entry.name !== "README.md"
        ? [path]
        : [];
    })
    .sort();
}

function maskFencedCode(source: string): string {
  const output: string[] = [];
  let fence: { character: string; length: number } | undefined;

  for (const line of source.split(/\r?\n/)) {
    if (fence === undefined) {
      const opening = line.match(/^ {0,3}(`{3,}|~{3,})/);

      if (opening === null) {
        output.push(line);
        continue;
      }

      fence = {
        character: opening[1][0],
        length: opening[1].length,
      };
      output.push("fenced-code-block");
      continue;
    }

    const closing = new RegExp(
      `^ {0,3}${fence.character}{${fence.length},}[ \\t]*$`,
    );

    if (closing.test(line)) {
      fence = undefined;
    }

    output.push("");
  }

  return output.join("\n");
}

function h1Count(source: string): number {
  return maskFencedCode(source)
    .split("\n")
    .filter((line) => /^ {0,3}#[ \t]+\S/.test(line)).length;
}

function metadataValues(source: string, name: string): string[] {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    ...maskFencedCode(source).matchAll(
      new RegExp(`^- ${escapedName}:[ \\t]*(.*?)[ \\t]*$`, "gm"),
    ),
  ].map((match) => match[1]);
}

function h2Sections(source: string, title: string): string[][] {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lines = maskFencedCode(source).split("\n");
  const heading = new RegExp(
    `^ {0,3}##[ \\t]+${escapedTitle}(?:[ \\t]+#+)?[ \\t]*$`,
  );
  const sectionBoundary = /^ {0,3}#{1,2}(?:[ \t]+|$)/;
  const sections: string[][] = [];

  for (const [index, line] of lines.entries()) {
    if (!heading.test(line)) {
      continue;
    }

    const body: string[] = [];

    for (const followingLine of lines.slice(index + 1)) {
      if (sectionBoundary.test(followingLine)) {
        break;
      }

      body.push(followingLine);
    }

    sections.push(body);
  }

  return sections;
}

function indexedPlanRowCount(indexSource: string, name: string): number {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const row = new RegExp(
    `^[ \\t]*\\|[ \\t]*\\[[^\\]\\r\\n]+\\]\\(\\./${escapedName}\\)[ \\t]*\\|([^|\\r\\n]*)\\|[ \\t]*$`,
    "gm",
  );

  return [...maskFencedCode(indexSource).matchAll(row)].filter(
    (match) => match[1].trim().length > 0,
  ).length;
}

function isDate(value: string | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

function localTargets(source: string): Set<string> {
  const targets = new Set<string>();

  for (const match of maskFencedCode(source).matchAll(markdownLink)) {
    const link = match[1].trim().replace(/^<|>$/g, "");

    if (link.startsWith("./")) {
      targets.add(decodeURIComponent(link.split("#", 1)[0]));
    }
  }

  return targets;
}

function checkIndexes(root: string, errors: string[], directory = root): void {
  const index = join(directory, "README.md");

  if (!existsSync(index)) {
    errors.push(`${relative(root, directory) || "."}: missing README.md index`);
    return;
  }

  const targets = localTargets(read(index));

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const target = `./${entry.name}/README.md`;

      if (!targets.has(target)) {
        errors.push(`${relative(root, index)}: missing index link ${target}`);
      }

      checkIndexes(root, errors, join(directory, entry.name));
    } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
      const target = `./${entry.name}`;

      if (!targets.has(target)) {
        errors.push(`${relative(root, index)}: missing index link ${target}`);
      }
    }
  }
}

function checkCurrentDocuments(root: string, errors: string[]): void {
  const documents: string[] = [];

  for (const directoryName of currentDocumentDirectories) {
    const directory = join(root, directoryName);

    if (!existsSync(directory)) {
      continue;
    }

    documents.push(...markdownFilePaths(directory));
  }

  for (const document of documents) {
    if (!existsSync(document)) {
      continue;
    }

    const source = read(document);
    const label = relative(root, document);
    const name = basename(document);
    const lastVerifiedValues = metadataValues(source, "Last verified");
    const verifiedAgainstValues = metadataValues(source, "Verified against");

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) {
      errors.push(`${label}: filename must use lowercase kebab-case`);
    }

    if (h1Count(source) !== 1) {
      errors.push(`${label}: must contain exactly one non-empty H1 heading`);
    }

    if (metadataValues(source, "Status").length > 0) {
      errors.push(`${label}: Status metadata is only valid for ADRs`);
    }

    if (lastVerifiedValues.length !== 1 || !isDate(lastVerifiedValues[0])) {
      errors.push(`${label}: missing or invalid Last verified date`);
    }

    if (
      verifiedAgainstValues.length !== 1 ||
      (verifiedAgainstValues[0] ?? "").trim().length === 0
    ) {
      errors.push(`${label}: missing Verified against`);
    }
  }
}

function checkDecisions(root: string, errors: string[]): void {
  const directory = join(root, "decisions");

  if (!existsSync(directory)) {
    return;
  }

  for (const name of readdirSync(directory).filter(
    (entry) => entry.endsWith(".md") && entry !== "README.md",
  )) {
    const document = join(directory, name);
    const source = read(document);
    const label = relative(root, document);
    const statusValues = metadataValues(source, "Status");
    const dateValues = metadataValues(source, "Date");
    const status = statusValues.length === 1 ? statusValues[0] : undefined;
    const date = dateValues.length === 1 ? dateValues[0] : undefined;

    if (!/^\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) {
      errors.push(`${label}: invalid ADR filename`);
    }

    if (
      !new Set(["Proposed", "Accepted", "Rejected", "Superseded"]).has(
        status ?? "",
      )
    ) {
      errors.push(`${label}: invalid ADR Status`);
    }

    if (!isDate(date)) {
      errors.push(`${label}: missing or invalid ADR Date`);
    }

    for (const relation of ["Supersedes", "Superseded by"]) {
      const values = metadataValues(source, relation);
      const value = values.length === 1 ? values[0] : undefined;

      if (
        value !== "None" &&
        !/^\[[^\]]+\]\(\.\/\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md\)$/.test(
          value ?? "",
        )
      ) {
        errors.push(
          `${label}: ${relation} must be None or a relative ADR link`,
        );
      }
    }
  }
}

function checkPlans(root: string, errors: string[]): void {
  const directory = join(root, "plans");

  if (!existsSync(directory)) {
    return;
  }

  const index = join(directory, "README.md");
  const entries = readdirSync(directory, { withFileTypes: true }).sort(
    (left, right) => left.name.localeCompare(right.name),
  );

  for (const entry of entries) {
    if (entry.isDirectory()) {
      errors.push(
        `${relative(root, join(directory, entry.name))}: subdirectories are not allowed under plans/`,
      );
    }
  }

  for (const entry of entries) {
    if (
      !entry.isFile() ||
      !entry.name.endsWith(".md") ||
      entry.name === "README.md"
    ) {
      continue;
    }

    const document = join(directory, entry.name);
    const name = basename(document);
    const source = read(document);
    const label = relative(root, document);

    const match = name.match(
      /^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/,
    );
    const statusValues = metadataValues(source, "Status");
    const startedValues = metadataValues(source, "Started");
    const scopeValues = metadataValues(source, "Scope");
    const closedValues = metadataValues(source, "Closed");
    const started = startedValues.length === 1 ? startedValues[0] : undefined;

    if (!match || !isDate(match[1])) {
      errors.push(`${label}: invalid Plan filename`);
    }

    if (statusValues.length > 0) {
      errors.push(`${label}: Status metadata is not allowed on Plans`);
    }

    if (existsSync(index)) {
      const indexedRows = indexedPlanRowCount(read(index), name);
      const indexLabel = relative(root, index);

      if (indexedRows !== 1) {
        errors.push(
          `${indexLabel}: ./${name} must appear exactly once in the Plan table`,
        );
      }
    }

    if (!isDate(started) || (match && started !== match[1])) {
      errors.push(`${label}: Started must match the filename date`);
    }

    if (
      scopeValues.length !== 1 ||
      (scopeValues[0] ?? "").trim().length === 0
    ) {
      errors.push(`${label}: missing or invalid Scope`);
    }

    for (const section of ["성공 기준", "단계", "결정 기록", "진행 기록"]) {
      if (h2Sections(source, section).length === 0) {
        errors.push(`${label}: missing section ${section}`);
      }
    }

    if (closedValues.length > 0) {
      errors.push(`${label}: Closed metadata is not allowed on Plans`);
    }

    if (h2Sections(source, "종료 결과").length > 0) {
      errors.push(`${label}: section 종료 결과 is not allowed on Plans`);
    }
  }
}

/**
 * Checks maintenance-document indexes and lifecycle metadata below a docs root.
 *
 * @throws If the documentation root does not exist.
 */
export function findDocumentationStructureErrors(inputRoot = "docs"): string[] {
  const root = resolve(inputRoot);

  if (!existsSync(root)) {
    throw new Error(`Documentation directory does not exist: ${root}`);
  }

  const errors: string[] = [];
  checkIndexes(root, errors);
  checkCurrentDocuments(root, errors);
  checkDecisions(root, errors);
  checkPlans(root, errors);
  return errors;
}

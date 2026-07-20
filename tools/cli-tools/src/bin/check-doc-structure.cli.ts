#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const markdownLink = /\[[^\]]*\]\(([^)]+)\)/g;
const currentDocumentDirectories = new Set([
  "architecture",
  "guides",
  "operations",
]);

function read(path: string): string {
  return readFileSync(path, "utf8");
}

function field(source: string, name: string): string | undefined {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return source.match(new RegExp(`^- ${escapedName}: (.+)$`, "m"))?.[1];
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

  for (const match of source.matchAll(markdownLink)) {
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
  const documents = [join(root, "engineering-harness.md")];

  for (const directoryName of currentDocumentDirectories) {
    const directory = join(root, directoryName);

    if (!existsSync(directory)) {
      continue;
    }

    documents.push(
      ...readdirSync(directory)
        .filter((name) => name.endsWith(".md") && name !== "README.md")
        .map((name) => join(directory, name)),
    );
  }

  for (const document of documents) {
    if (!existsSync(document)) {
      continue;
    }

    const source = read(document);
    const label = relative(root, document);

    if (field(source, "Status") !== "Active") {
      errors.push(`${label}: Status must be Active`);
    }

    if (!isDate(field(source, "Last verified"))) {
      errors.push(`${label}: missing or invalid Last verified date`);
    }

    if (!field(source, "Verified against")) {
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

    if (!/^\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) {
      errors.push(`${label}: invalid ADR filename`);
    }

    if (
      !new Set(["Proposed", "Accepted", "Rejected", "Superseded"]).has(
        field(source, "Status") ?? "",
      )
    ) {
      errors.push(`${label}: invalid ADR Status`);
    }

    if (!isDate(field(source, "Date"))) {
      errors.push(`${label}: missing or invalid ADR Date`);
    }

    for (const relation of ["Supersedes", "Superseded by"]) {
      const value = field(source, relation);

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

  for (const name of readdirSync(directory).filter(
    (entry) => entry.endsWith(".md") && entry !== "README.md",
  )) {
    const document = join(directory, name);
    const source = read(document);
    const label = relative(root, document);
    const match = name.match(
      /^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/,
    );
    const status = field(source, "Status");
    const started = field(source, "Started");
    const closed = field(source, "Closed");

    if (!match || !isDate(match[1])) {
      errors.push(`${label}: invalid Plan filename`);
    }

    if (!new Set(["Active", "Completed", "Cancelled"]).has(status ?? "")) {
      errors.push(`${label}: invalid Plan Status`);
    }

    if (!isDate(started) || (match && started !== match[1])) {
      errors.push(`${label}: Started must match the filename date`);
    }

    if (status === "Active" ? closed !== "N/A" : !isDate(closed)) {
      errors.push(
        `${label}: invalid Closed value for ${status ?? "unknown"} status`,
      );
    }

    for (const section of [
      "성공 기준",
      "단계",
      "결정 기록",
      "진행 기록",
      "종료 결과",
    ]) {
      if (!source.includes(`## ${section}`)) {
        errors.push(`${label}: missing section ${section}`);
      }
    }
  }
}

try {
  const root = resolve(process.argv[2] ?? "docs");

  if (!existsSync(root)) {
    throw new Error(`Documentation directory does not exist: ${root}`);
  }

  const errors: string[] = [];
  checkIndexes(root, errors);
  checkCurrentDocuments(root, errors);
  checkDecisions(root, errors);
  checkPlans(root, errors);

  if (errors.length > 0) {
    console.error(`Documentation structure errors:\n${errors.join("\n")}`);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

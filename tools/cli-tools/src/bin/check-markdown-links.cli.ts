#!/usr/bin/env node
import { findBrokenMarkdownLinks } from "../check-markdown-links.js";

try {
  const failures = findBrokenMarkdownLinks(process.argv.slice(2));

  if (failures.length > 0) {
    console.error(`Broken Markdown links:\n${failures.join("\n")}`);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

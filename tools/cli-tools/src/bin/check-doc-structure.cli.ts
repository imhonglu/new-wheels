#!/usr/bin/env node
import { findDocumentationStructureErrors } from "../check-doc-structure.js";

try {
  const errors = findDocumentationStructureErrors(process.argv[2]);

  if (errors.length > 0) {
    console.error(`Documentation structure errors:\n${errors.join("\n")}`);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

# @imhonglu/cli-tools

[English](./README.md) | [한국어](./README_KR.md)

Internal documentation-checking commands for `@imhonglu/new-wheels`. The root `check:docs` script composes these commands; writer-facing rules are in the [Markdown guide](../../docs/guides/writing-markdown.md), while implementation and test structure follow the repository's [CLI tool guide](../../docs/guides/writing-cli-tools.md).

From the repository root, build the private package before invoking an individual command:

```sh
pnpm --filter @imhonglu/cli-tools build
```

## Commands

### `check-doc-structure`

Checks filenames, single non-empty `#` H1 headings, indexes, and metadata for non-index Architecture, Guide, and Operation documents. It separately checks ADR naming and lifecycle and active Plan naming, placement, and structure.

```sh
node tools/cli-tools/dist/bin/check-doc-structure.cli.js docs
```

### `check-markdown-links`

Checks local targets in Markdown files and directories.

```sh
node tools/cli-tools/dist/bin/check-markdown-links.cli.js README.md docs
```

Local target paths must match the exact filename casing. Anchor links and external URLs are skipped. Directory traversal ignores generated or dependency directories named `.cache`, `assets`, `dist`, `docs`, `node_modules`, `src`, and `temp`; pass an ignored directory explicitly when it should be checked.

# @imhonglu/cli-tools

Internal CLI tools for `@imhonglu/new-wheels`.

Build the package before invoking an installed command.

```sh
pnpm --filter @imhonglu/cli-tools build
```

## Commands

### `check-doc-structure`

Checks maintenance-document indexes, metadata, ADR naming and lifecycle, and Plan naming and lifecycle.

```sh
pnpm exec check-doc-structure docs
```

### `check-markdown-links`

Checks local targets in Markdown files and directories.

```sh
pnpm exec check-markdown-links README.md docs
```

Local target paths must match the exact filename casing. Anchor links and external URLs are skipped. Directory traversal ignores generated or dependency directories named `assets`, `dist`, `docs`, `node_modules`, `src`, and `temp`; pass an ignored directory explicitly when it should be checked.

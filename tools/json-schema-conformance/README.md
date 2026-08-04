# JSON Schema conformance tooling

[English](./README.md) | [한국어](./README_KR.md)

Private tooling that generates and runs the JSON Schema Draft 2020-12 compatibility suite for `@imhonglu/json-schema`.

The generator copies pinned upstream JSON fixtures without rewriting them and adds thin Vitest modules. The reasons for separating this tool from the public library and avoiding the TypeScript Compiler API are recorded in [ADR 0002](../../docs/decisions/0002-separate-json-schema-conformance-tooling.md).

## Boundary

- `suite-lock.json` pins the upstream repository, commit, draft, and excluded files.
- `known-failures.json` pins each expected-failure case to the same upstream revision.
- `.cache/JSON-Schema-Test-Suite` is a disposable checkout and is not committed.
- `generated` contains deterministic JSON fixture and test-module pairs and is committed for review.
- The generated directory is excluded from repository formatting and spelling checks. The generator unit tests define the thin module shape, TypeScript 7 checks the modules, and JSON fixtures remain byte-for-byte identical to upstream.
- The package is private and depends on the public `@imhonglu/json-schema` boundary.
- The tool is ESM-only and is excluded from the public packages' CommonJS conversion step.
- CLI implementation follows the repository's [CLI tool guide](../../docs/guides/writing-cli-tools.md).
- Default workspace tests run tooling and CLI tests under `src` only. CI invokes the full conformance baseline separately so generated tests do not leak into generic test discovery.

## Baseline ownership

`suite-lock.json` is the source of truth for the upstream repository, revision, draft, and exclusions. `known-failures.json` owns the expected fixture, group and test-case counts together with case-level failure IDs. The baseline check verifies these manifests, one-to-one fixture/test-module pairs, and generated wrapper contents. A new failure or an unexpected pass makes `test:conformance` exit non-zero.

Expected-failure entries classify conformance outcome, not the exact exception shape. When changing code related to a listed case, inspect its diagnostic before accepting the unchanged expected-failure status.

The copied fixtures retain the upstream project's MIT license in [`UPSTREAM_LICENSE`](./UPSTREAM_LICENSE).

## Commands

Refresh the pinned upstream checkout and regenerate tests:

```sh
pnpm --filter @imhonglu/json-schema-conformance refresh-tests
```

Generate from an existing checkout without network access:

```sh
pnpm --filter @imhonglu/json-schema-conformance build
node tools/json-schema-conformance/dist/bin/generate-tests.cli.js \
  --suite-dir /path/to/JSON-Schema-Test-Suite/tests/draft2020-12
```

Run generator unit tests or the full conformance suite:

```sh
pnpm --filter @imhonglu/json-schema-conformance test -- --run
pnpm --filter @imhonglu/json-schema-conformance check:generated
pnpm --filter @imhonglu/json-schema-conformance check:baseline
pnpm --filter @imhonglu/json-schema-conformance test:conformance
```

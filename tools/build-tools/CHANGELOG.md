# @imhonglu/build-tools

## 2.0.0

### Major Changes

- f520262: Generate ESM, CommonJS, declarations, and source mappings directly with tsdown while preserving package entry points. Remove the `esm-to-cjs` command from `@imhonglu/build-tools`; consumers of that command must use their package build tool to emit CommonJS directly.

### Patch Changes

- Updated dependencies [f520262]
  - @imhonglu/toolkit@2.0.3

## 1.0.11

### Patch Changes

- 336285a: Add Korean README entry points and keep package documentation aligned across both supported languages.
- 20d2e79: Run `esm-to-cjs` directly from its compiled `dist` entrypoint.
- Updated dependencies [5f7f9a6]
  - @imhonglu/toolkit@2.0.2

## 1.0.10

### Patch Changes

- 00e679f: Ship the `esm-to-cjs` command from compiled JavaScript output.
  - @imhonglu/toolkit@2.0.1

## 1.0.9

### Patch Changes

- Updated dependencies [2b11395]
  - @imhonglu/toolkit@2.0.0

## 1.0.8

### Patch Changes

- 2b1a371: Update the workspace build and CommonJS distribution workflow.
- Updated dependencies [2b1a371]
  - @imhonglu/toolkit@1.0.5

## 1.0.7

### Patch Changes

- 62d6366: bump versions

## 1.0.3

### Patch Changes

- 260bc0c: change build target to ES2015
- Updated dependencies [260bc0c]
  - @imhonglu/configs@1.0.6
  - @imhonglu/toolkit@1.0.2

# @imhonglu/toolkit

## 2.0.3

### Patch Changes

- f520262: Generate ESM, CommonJS, declarations, and source mappings directly with tsdown while preserving package entry points. Remove the `esm-to-cjs` command from `@imhonglu/build-tools`; consumers of that command must use their package build tool to emit CommonJS directly.
- Updated dependencies [f520262]
  - @imhonglu/type-guard@1.0.4
  - @imhonglu/type-object@1.0.5

## 2.0.2

### Patch Changes

- 5f7f9a6: Cache exact return values immediately, including pending or rejected Promises, so concurrent calls with the same key share one execution. Custom resolvers now receive positional arguments as declared, and the built-in store caches `undefined` results correctly.

## 2.0.1

### Patch Changes

- Updated dependencies [00e679f]
  - @imhonglu/type-object@1.0.4

## 2.0.0

### Major Changes

- 2b11395: Replace `unwrapOr` with a focused `unwrap` API that throws `UnwrapError` and accepts an optional message and error options.

## 1.0.5

### Patch Changes

- 2b1a371: Update the workspace build and CommonJS distribution workflow.
- Updated dependencies [2b1a371]
  - @imhonglu/type-guard@1.0.3
  - @imhonglu/type-object@1.0.3

## 1.0.4

### Patch Changes

- 7788374: bump package versions
- Updated dependencies [7788374]
  - @imhonglu/type-object@1.0.2
  - @imhonglu/type-guard@1.0.2

## 1.0.3

### Patch Changes

- d5dc521: add unwrap and unwrapOr utility functions

## 1.0.2

### Patch Changes

- 260bc0c: change build target to ES2015
- Updated dependencies [260bc0c]
  - @imhonglu/type-object@1.0.1
  - @imhonglu/type-guard@1.0.1

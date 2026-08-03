# @imhonglu/format

## 1.0.13

### Patch Changes

- @imhonglu/toolkit@2.0.1

## 1.0.12

### Patch Changes

- Updated dependencies [2b11395]
  - @imhonglu/toolkit@2.0.0

## 1.0.11

### Patch Changes

- e7aa7af: Rebuild the pattern builder around composable regular expression AST nodes and an immutable fluent API.

  Replace the previous `characterSet`, `concat`, and `oneOf` functions with the `pattern` factory and its `raw` and `characterSet` helpers. Replace `PatternBuilder.toRegExp()` with `compile()`, and expose the new AST node classes for lower-level composition.

  Migrate the format package to the new pattern builder API without changing its public formatter API.

- Updated dependencies [e7aa7af]
  - @imhonglu/pattern-builder@2.0.0

## 1.0.10

### Patch Changes

- 2b1a371: Update the workspace build and CommonJS distribution workflow.
- Updated dependencies [2b1a371]
  - @imhonglu/pattern-builder@1.0.6
  - @imhonglu/toolkit@1.0.5

## 1.0.9

### Patch Changes

- 7788374: bump package versions
- Updated dependencies [7788374]
  - @imhonglu/pattern-builder@1.0.5
  - @imhonglu/toolkit@1.0.4

## 1.0.8

### Patch Changes

- 7b6c6eb: Add type-safe JSON Pointer get operation

## 1.0.7

### Patch Changes

- avoid babel transpile

## 1.0.6

### Patch Changes

- update @imhonglu/pattern-builder to version 1.0.4

## 1.0.5

### Patch Changes

- ~~update @imhonglu/pattern-builder to version 1.0.4~~
  - incorrect patch

## 1.0.4

### Patch Changes

- 260bc0c: change build target to ES2015
- Updated dependencies [260bc0c]
  - @imhonglu/pattern-builder@1.0.2
  - @imhonglu/toolkit@1.0.2

# @imhonglu/pattern-builder

## 2.0.0

### Major Changes

- e7aa7af: Rebuild the pattern builder around composable regular expression AST nodes and an immutable fluent API.

  Replace the previous `characterSet`, `concat`, and `oneOf` functions with the `pattern` factory and its `raw` and `characterSet` helpers. Replace `PatternBuilder.toRegExp()` with `compile()`, and expose the new AST node classes for lower-level composition.

  Migrate the format package to the new pattern builder API without changing its public formatter API.

## 1.0.6

### Patch Changes

- 2b1a371: Update the workspace build and CommonJS distribution workflow.

## 1.0.5

### Patch Changes

- 7788374: bump package versions

## 1.0.4

### Patch Changes

- ~~6add3ec: update @imhonglu/pattern-builder to version 1.0.3~~
  - incorrect patch

## 1.0.3

### Patch Changes

- 1ced049: add error handling to `toRegExp()` method

## 1.0.2

### Patch Changes

- 260bc0c: change build target to ES2015

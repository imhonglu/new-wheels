---
"@imhonglu/pattern-builder": major
"@imhonglu/format": patch
---

Rebuild the pattern builder around composable regular expression AST nodes and an immutable fluent API.

Replace the previous `characterSet`, `concat`, and `oneOf` functions with the `pattern` factory and its `raw` and `characterSet` helpers. Replace `PatternBuilder.toRegExp()` with `compile()`, and expose the new AST node classes for lower-level composition.

Migrate the format package to the new pattern builder API without changing its public formatter API.

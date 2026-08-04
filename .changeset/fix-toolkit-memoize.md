---
"@imhonglu/toolkit": patch
---

Cache exact return values immediately, including pending or rejected Promises, so concurrent calls with the same key share one execution. Custom resolvers now receive positional arguments as declared, and the built-in store caches `undefined` results correctly.

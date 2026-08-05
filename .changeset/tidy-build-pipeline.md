---
"@imhonglu/build-tools": major
"@imhonglu/configs": patch
"@imhonglu/format": patch
"@imhonglu/json-schema": patch
"@imhonglu/json-schema-typed": patch
"@imhonglu/pattern-builder": patch
"@imhonglu/toolkit": patch
"@imhonglu/type-guard": patch
"@imhonglu/type-object": patch
---

Generate ESM, CommonJS, declarations, and source mappings directly with tsdown while preserving package entry points. Remove the `esm-to-cjs` command from `@imhonglu/build-tools`; consumers of that command must use their package build tool to emit CommonJS directly.

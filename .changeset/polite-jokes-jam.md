---
"@imhonglu/json-schema": patch
---

- Changed test structure from dynamic file loading to generated test files
- Implemented JSON Schema keywords:
  - allOf: Validates data against all sub schemas
  - anyOf: Validates data against at least one sub schema
  - oneOf: Validates data against exactly one sub schema
  - not: Validates data against negation of sub schema
  - if/then/else: Conditional schema validation
  - dependentSchemas: Schema dependencies between properties
  - unevaluatedProperties: Validates additional properties
  - unevaluatedItems: Validates additional array items
- Enhanced `$ref` resolution and handling

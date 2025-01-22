# @imhonglu/json-schema

## 1.0.7

### Patch Changes

- update @imhonglu/format to version 1.0.6

## 1.0.6

### Patch Changes

- 260bc0c: change build target to ES2015
- Updated dependencies [260bc0c]
  - @imhonglu/type-object@1.0.1
  - @imhonglu/type-guard@1.0.1
  - @imhonglu/toolkit@1.0.2
  - @imhonglu/format@1.0.4

## 1.0.5

### Patch Changes

- 2cfbb22: improve $ref handling

## 1.0.4

### Patch Changes

- 7dd91de: - Changed test structure from dynamic file loading to generated test files
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

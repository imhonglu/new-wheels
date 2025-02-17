---
"@imhonglu/json-schema": patch
"@package-name": minor
---

### Bug Fixes
- Fixed an issue where fields with `default` values in JSON Schema `properties` were not being treated as optional.

### Improvements
- Enhanced classes created by extending `createSchemaClass` so that default values are not required when all fields are optional by introducing `SchemaConstructorParams` utility type.

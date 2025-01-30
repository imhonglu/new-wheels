---
"@imhonglu/json-schema": minor
---

## Breaking Changes

### Schema Type Definitions Restructured
The `SchemaDefinition` type has been split into more specific utility types for better type inference and maintainability:

- SchemaDefinition.Instance => InferSchemaType
- SchemaDefinition.Type => SchemaVariant
- SchemaDefinition.ConstType => ConstSchema
- SchemaDefinition.EnumType => EnumSchema
- SchemaDefinition.NullType => TypeSchema | InferSchema<{ type: "null" }>
- SchemaDefinition.BooleanType => TypeSchema |  InferSchema<{ type: "boolean" }>
- SchemaDefinition.ObjectType => TypeSchema | InferSchema<{ type: "object" }>
- SchemaDefinition.ArrayType => TypeSchema | InferSchema<{ type: "array" }>
- SchemaDefinition.StringType => TypeSchema | InferSchema<{ type: "string" }>
- SchemaDefinition.NumericType => TypeSchema | InferSchema<{ type: "number" }>
- ~~SchemaDefinition.InferRequiredProperty~~

**Migration Guide:**
If you're using any of the old SchemaDefinition types, replace them with their new counterparts. For example:
```ts
// Before
type MySchema = SchemaDefinition.Instance<typeof schema>;

// After
type MySchema = InferSchemaType<typeof schema>;
```

## New Features

### `createSchemaClass` Helper Function

A new utility function to create type-safe JSON schemas:

```ts
import { createSchemaClass } from '@imhonglu/json-schema';

// Basic usage
class User extends createSchemaClass({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' }
  },
  required: ['name'] // ✅ Correctly Inferred Type: ['name', 'age']
}) {}

const user = new User({ name: "John", age: 30 }); // ✅ Works
const invalid = new User({ name: 123 }); // ❌ Type error: number is not assignable to string

console.log(user.name); // "John"
console.log(user.age);  // 30
```

### Improved Type Inference

#### Union Types in `type` Keyword
The type system now correctly infers validation properties based on each type in a union:

```ts
class FlexibleSchema extends createSchemaClass({
  type: ['string', 'number'],
  maxLength: 10,  // ✅ Correctly inferred for string type
  maximum: 100,   // ✅ Correctly inferred for number type
}) {}

const ten = new FlexibleSchema(10); // ✅ Constructor Argument Type: string | number
const invalid = new FlexibleSchema(true); // ❌ Type error: boolean is not assignable to string | number
```

#### Enhanced `default` Value Type Inference
Default values are now properly typed with unions and optional types:

```ts
class FlexibleSchema extends createSchemaClass({
  type: ['string', 'null'],
  default: 'hello'  // ✅ Type: string | null | undefined
}) {}

const hello = new FlexibleSchema("hello"); // ✅ Constructor Argument Type: string | null
```

### Support Function-based Default Values

The schema system now allows default values to be defined either as static values or functions that generate dynamic values at runtime.

```ts
class FlexibleSchema extends createSchemaClass({
  type: 'object',
  properties: {
    name: { type: 'string' },
    createdAt: { type: 'string', default: () => new Date().toISOString() }, // Dynamic default
    status: { type: 'string', default: 'active' } // Static default
  }
}) {}

const john = new FlexibleSchema({ name: "John" });
// ✅ Default values are applied
// {
//   name: "John",
//   createdAt: "2021-01-01T00:00:00.000Z",
//   status: "active"
// }
```

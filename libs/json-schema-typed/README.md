# @imhonglu/json-schema-typed

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

A tool for type-safe JSON Schema usage. It ensures type safety of JSON Schema by leveraging TypeScript's type system.

## Features

- Type-safe schema definition: Define JSON Schema in a type-safe way using `defineSchema`.
- Schema instance type inference: Convert JSON Schema to TypeScript types using `SchemaInstanceType`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [defineSchema](#defineschema)
  - [SchemaInstanceType](#schemainstancetype)
    - [Using with defineSchema](#using-with-defineschema)
    - [Primitive Types](#primitive-types)
    - [Object Types](#object-types)
    - [Array Types](#array-types)
    - [Enum and Const](#enum-and-const)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/json-schema-typed
```

## Usage

### defineSchema

`defineSchema` is a helper function that assists with TypeScript type inference when defining JSON Schema. It validates the JSON Schema at compile time and returns the input schema as is at runtime.

```ts
import { defineSchema } from '@imhonglu/json-schema-typed';

// Schema definition example
const schema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  // ✅ Keys in properties are automatically inferred when inputting required fields
  required: ["name", "age"],
});

// Error case
const invalidSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
  },
  // ❌ Error because age is not defined in properties
  required: ["name", "age"],
});
```

### SchemaInstanceType

`SchemaInstanceType` is a utility type that infers the instance type of JSON Schema. Using this type ensures that only data of the correct type can be used according to the JSON Schema definition.

#### Using with defineSchema

```ts
import { defineSchema, type SchemaInstanceType } from '@imhonglu/json-schema-typed';

// Schema definition
const userSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name"],
});

// Type inference
type UserType = SchemaInstanceType<typeof userSchema>;
// { name: string; age?: number }

// Usage example
const user: UserType = {
  name: "John",
  age: 20  // ✅ Optional field
};

// Error case
const invalidUser: UserType = {
  age: 20,
  // ❌ Missing name field
};
```

#### Primitive Types

```ts
import type { SchemaInstanceType } from '@imhonglu/json-schema-typed';

// Basic type examples
type StringType = SchemaInstanceType<{ type: "string" }>;  // String type
type NumberType = SchemaInstanceType<{ type: "number" }>;  // Number type
type BooleanType = SchemaInstanceType<{ type: "boolean" }>; // Boolean type
type NullType = SchemaInstanceType<{ type: "null" }>;      // Null type

// Usage examples
const str: StringType = "hello";  // ✅
const num: NumberType = 42;       // ✅
const bool: BooleanType = true;   // ✅
const nul: NullType = null;       // ✅

// Error cases
const invalidStr: StringType = 42;      // ❌ Number type not allowed
const invalidNum: NumberType = "42";    // ❌ String type not allowed
const invalidBool: BooleanType = 1;     // ❌ Number type not allowed
const invalidNul: NullType = undefined; // ❌ Undefined not allowed
```

#### Object Types

```ts
// All fields required
type RequiredUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: ["name", "age"];
}>;
// { name: string; age: number }

// Usage example
const requiredUser: RequiredUserType = {
  name: "John",
  age: 20  // ✅ All fields required
};

// Error case
const invalidRequiredUser: RequiredUserType = {
  name: "John"
  // ❌ Missing age field
};

// Some fields optional
type OptionalUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: ["name"];
}>;
// { name: string; age?: number }

// Usage example
const optionalUser: OptionalUserType = {
  name: "John",  // ✅ age is optional
};

// All fields optional
type AllOptionalUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: [];
}>;
// { name?: string; age?: number }

// Usage example
const allOptionalUser: AllOptionalUserType = {};  // ✅ All fields optional
```

#### Array Types

```ts
// Basic array type
type StringArrayType = SchemaInstanceType<{
  type: "array";
  items: { type: "string" };
}>;
// string[]

// Usage example
const fruits: StringArrayType = ["apple", "banana", "orange"];  // ✅

// Error case
const invalidFruits = [1, 2, 3];  // ❌ Number type not allowed

// Object array type
type UserArrayType = SchemaInstanceType<{
  type: "array";
  items: {
    type: "object";
    properties: {
      name: { type: "string" };
      age: { type: "number" };
    };
    required: ["name"];
  };
}>;
// Array<{ name: string; age?: number }>

// Usage example
const users: UserArrayType = [
  { name: "John", age: 20 },  // ✅
  { name: "Jane" }            // ✅ age is optional
];

// Error case
const invalidUsers: UserArrayType = [
  { age: 20 }  // ❌ Missing name field
];
```

#### Enum and Const

```ts
// Enum type
type FruitType = SchemaInstanceType<{
  enum: ["apple", "banana", "orange"];
}>;
// "apple" | "banana" | "orange"

// Usage example
const fruit: FruitType = "apple";  // ✅

// Error case
const invalidFruit: FruitType = "watermelon";  // ❌ Value not allowed

// Const type
type HelloType = SchemaInstanceType<{
  const: "hello";
}>;
// "hello"

// Usage example
const hello: HelloType = "hello";  // ✅

// Error case
const invalidHello: HelloType = "world";  // ❌ Different value not allowed
```

### Creatable

`Creatable` is a utility type that infers the data type required when creating an instance of JSON Schema. Using this type allows clear distinction between required and optional fields.

```ts
import { defineSchema, type SchemaInstanceType, type Creatable } from '@imhonglu/json-schema-typed';

// Schema definition
const userSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    createdAt: { 
      type: "string", 
      format: "date-time", 
      default: new Date().toISOString() 
    }
  },
  required: ["name", "age"]
});

// Type definitions
type NewUser = Creatable<typeof userSchema>;      // Input type
type User = SchemaInstanceType<typeof userSchema>;  // Result type
// NewUser: { name: string; age: number; createdAt?: string }
// User: { name: string; age: number; createdAt: string }

// Actual instance creation
const createUser = (input: NewUser): User => {
  // Input type is validated by Creatable
  return {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString()
  };
};

// Correct usage example
const validUser: NewUser = {
  name: "John",
  age: 20
  // ✅ createdAt is optional and has a default value
};

const user: User = createUser(validUser);
// ✅ user.createdAt is always a required field

// Incorrect usage example
const invalidUser: NewUser = {
  name: "John",
  // ❌ Missing age field
};
```

## API Reference

### Core API

- [defineSchema](./docs/json-schema-typed.defineschema.md) - Helper function for defining type-safe JSON Schema
- [SchemaInstanceType](./docs/json-schema-typed.schemainstancetype.md) - Utility type for inferring JSON Schema instance types
- [Creatable](./docs/json-schema-typed.creatable.md) - Utility type for inferring data types required for JSON Schema instance creation

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema-typed.jsonschema.md) - JSON Schema types including Object Schema and Boolean Schema
- [ObjectSchema](./docs/json-schema-typed.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema-typed.booleanschema.md) - Boolean Schema

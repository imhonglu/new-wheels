# @imhonglu/json-schema

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A library that complies with JSON Schema 2020-12-draft specification
- Validated based on [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)
- Supports **static type inference** based on schema definitions

![demo-1](./assets/demo.gif)

## Table of Contents

- [Features](#features)
- [Implementation Status](#implementation-status)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Features

- [x] Type-safe schema definition with nesting support
- [ ] Type inference support when properties with `default` values are included in the `required` array
- [ ] Custom schema validation messages and error handling

## Implementation Status

Currently, 1,487 out of 1,563 test cases have passed (95.1%)

Excluded:

- `defs`: Schema definition related tests, excluded as they are not related to validation
- `format`: Excluded as it belongs to the optional category

Unsupported:

- `anchor`
- `refRemote`
- `vocabulary`
- `dynamicRef`
- `optional/anchor`
- `optional/dynamicRef`
- `optional/dependencies-compatibility`
- `optional/format/relative-json-pointer`
- `optional/format/json-pointer`

## Installation

```bash
npm install @imhonglu/json-schema
```

## Usage

### Basic Schema Definition

```ts
// address.ts
import { createSchemaClass } from "@imhonglu/json-schema";

export class Address extends createSchemaClass({
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string" },
    zip: { type: "string" },
  },
  required: ["street"], // ✅ Inferred type: ["street", "city", "zip"]
}) {}
// ✅ Inferred type: Address {
//   street: string;
//   city?: string;
//   zip?: string;
// }
```

### Nested Schema

```ts
// person.ts
import { createSchemaClass } from "@imhonglu/json-schema";
import { Address } from "./address.js";

export class Person extends createSchemaClass({
  type: "object",
  properties: {
    name: { type: "string" },
    address: Address,
    deletedAt: {
      type: ["string", "null"],
      default: null,
      // ✅ Inferred type: string | null | undefined | ((...args: any[]) => string | null)
    },
  },
  required: ["name"],
}) {}

// ✅ Inferred type: {
//   name: string;
//   address?: Address
//   deletedAt?: string | null
// }
```

### Usage with `new`

When passing data for nested schemas, it automatically creates instances of the nested schemas.

```ts
// main.ts
import { Person } from "./person.js";

const johnDoe = new Person({
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Toronto",
    zip: "M5H 2N2",
  },
});
// Person {
//   name: 'John Doe',
//   address: Address { street: '123 Main St', city: 'Toronto', zip: 'M5H 2N2' },
//   deletedAt: null,
// }

console.log(johnDoe.name); // 'John Doe'
console.log(johnDoe.address?.street); // '123 Main St'
console.log(johnDoe.deletedAt); // null
```

Or you can create instances of nested schemas directly.

```ts
const maryDoe = new Person({
  name: "Mary Doe",
  address: new Address({
    street: "456 Main St",
    city: "Toronto",
    zip: "M5H 2N2",
  }),
});
// Person {
//   name: 'Mary Doe',
//   address: Address { street: '456 Main St', city: 'Toronto', zip: 'M5H 2N2' },
//   deletedAt: null,
// }
```

### Parsing with `parse`

The `parse` method creates a schema instance by parsing a string.
```ts
const person = Person.parse('{ "name": "John" }'); // Person
```

### Parsing with `safeParse`

You can safely parse using the `safeParse` method.

```ts
const person = Person.safeParse('{ "name": "John" }'); // SafeResult<Person>

if (person.success) {
  console.log(person.data); // Person
} else {
  console.error(person.error); // ValidationFailedError
}
```

### Serializing with `JSON.stringify`

The `toJSON` method is implemented, allowing serialization through `JSON.stringify`.

```ts
const person = new Person({ name: "John" });
const json = JSON.stringify(person); // '{"name":"John","deletedAt":null}'
```

## API Reference

### Core API

- [Schema](./docs/json-schema.schema.md) - The implementation of JSON Schema and the base class for all schema types
- [createSchemaClass](./docs/json-schema.createschemaclass.md) - Creates a type-safe schema class from a JSON Schema definition
- [InferSchemaType](./docs/json-schema.inferschematype.md) - Automatically infers TypeScript types from schema definitions
- [InferSchema](./docs/json-schema.inferschema.md) - Automatically infers schema definitions from object types
- [ConstSchema](./docs/json-schema.constschema.md) - Defines a schema that only allows a single fixed value
- [EnumSchema](./docs/json-schema.enumschema.md) - Defines a schema that only allows one of the predefined values
- [TypeSchema](./docs/json-schema.typeschema.md) - Schema that defines basic JSON data types
- [SchemaVariant](./docs/json-schema.schemavariant.md) - Includes all schema types supported by the library

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - JSON Schema type including Object Schema and Boolean Schema types
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema

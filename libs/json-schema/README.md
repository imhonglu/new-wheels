# @imhonglu/json-schema

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A library that complies with JSON Schema 2020-12-draft specification
- Validated based on [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)
- Supports **static type inference** for schema definitions

![demo-1](./assets/demo.gif)

## Table of Contents

- [Features](#features)
- [Implementation Status](#implementation-status)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Features

- [x] Type-safe schema definitions with nesting support
- [ ] Customizable schema validation messages and error handling

## Implementation Status

Currently, 1,487 out of 1,563 test cases have passed (95.1%)

The following items have been excluded:

- `defs`: Schema definition tests, excluded as they are not related to validation
- `format`: Excluded as it belongs to the optional category

The following items are not supported:

- `anchor`: Not supported
- `refRemote`: Not supported
- `vocabulary`: Not supported
- `dynamicRef`: Not supported
- `optional/anchor`: Not supported
- `optional/dynamicRef`: Not supported
- `optional/dependencies-compatibility`: Not supported
- `optional/format/relative-json-pointer`: Not supported
- `optional/format/json-pointer`: Not supported

## Installation

```bash
npm install @imhonglu/json-schema
```

## Usage

```ts
// address.ts
import { Schema, SchemaDefinition } from "@imhonglu/json-schema";

export const Address = new Schema({
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string" },
    zip: { type: "string" },
  },
  required: ["street"] as const,
});

export type Address = SchemaDefinition.Instance<typeof Address>;
// {
//   street: string;
//   city?: string;
//   zip?: string;
// }
```

```ts
// person.ts
import { Schema, SchemaDefinition } from "@imhonglu/json-schema";
import { Address } from "./address.js";

export const Person = new Schema({
  type: "object",
  properties: {
    name: { type: "string" },
    address: Address,
  },
  required: ["name"] as const,
});

export type Person = SchemaDefinition.Instance<typeof Person>;
// {
//   name: string;
//   address?: {
//     street: string;
//     city?: string;
//     zip?: string;
//   };
// }
```

```ts
// main.ts
import { Person } from "./person.js";

const person = Person.parse(
  '{"name": "John Doe", "address": {"street": "123 Main St", "city": "Toronto", "zip": "M5H 2N2"}}',
);

console.log(person);
// { name: 'John Doe', address: { street: '123 Main St', city: 'Toronto', zip: 'M5H 2N2' } }
```

## API Reference

### Core API

- [Schema](./docs/json-schema.schema.md) - JSON Schema implementation
- [SchemaDefinition](./docs/json-schema.schemadefinition.md) - Namespace providing static type inference and type utilities for `Schema`

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - JSON Schema type including Object Schema and Boolean Schema types
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema

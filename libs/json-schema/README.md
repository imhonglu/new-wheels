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

Currently, 1,581 out of 1,747 test cases have passed (89.3%)

The following items have been excluded:

- `defs`: Schema definition tests, excluded as they are not related to validation
- `format`: Excluded as it belongs to the optional category

### Remaining Test Suite Status

| Name | Progress (Passed/Total) | Status |
|---------|-----------------|------|
| not | 89% (8/9) | 🟢 Complete |
| ref | 83% (64/77) | 🟡 In Progress |
| optional/format | 76% (16/21) | 🟡 In Progress |
| optional/ecmascript-regex | 80% (16/20) | 🟡 In Progress |
| unevaluated-properties | 73% (89/122) | 🟡 In Progress |
| unevaluated-items | 70% (46/66) | 🟡 In Progress |
| dynamicRef | 20% (4/20) | 🔴 Started |
| optional/dependencies-compatibility | 14% (1/7) | 🔴 Started |
| anchor | 0% (0/4) | ⚪ Not Started |
| optional/anchor | 0% (0/1) | ⚪ Not Started |
| optional/dynamicRef | 0% (0/1) | ⚪ Not Started |
| optional/float-overflow | 0% (0/1) | ⚪ Not Started |
| optional/non-bmp-regex | 0% (0/2) | ⚪ Not Started |
| optional/ref-of-unknown-keyword | 0% (0/3) | ⚪ Not Started |
| ref-remote | 0% (0/15) | ⚪ Not Started |
| vocabularies | 0% (0/5) | ⚪ Not Started |

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

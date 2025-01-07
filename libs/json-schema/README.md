# @imhonglu/json-schema

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A library that complies with JSON Schema 2020-12-draft specification.
- Validated based on [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).
- Keywords types are automatically inferred based on schema definitions.

![demo-1](./assets/demo.gif)

## Features

- [x] Type-safe schema definitions with nesting support
- [ ] Customizable schema validation messages and error handling

## Specification

- [ ] [Core](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-the-json-schema-core-vocabu)
  - [x] defs
  - [x] ref
- [ ] [Basic Meta Data](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-a-vocabulary-for-basic-meta)
- [x] [StructuralValidation](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-a-vocabulary-for-structural)
- [x] [Applying Sub-schema](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01#name-keywords-for-applying-subschema)
- [ ] [Format](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-vocabularies-for-semantic-c)
  - [x] date-time
  - [x] date
  - [x] time
  - [x] duration
  - [x] email
  - [x] hostname
  - [x] idn-email
  - [x] idn-hostname
  - [x] ipv4
  - [x] ipv6
  - [ ] iri
  - [ ] iri-reference
  - [ ] json-pointer
  - [ ] json-pointer-uri-fragment
  - [x] regex
  - [ ] relative-json-pointer
  - [x] uri
  - [x] uri-reference
  - [x] uri-template
  - [ ] uuid
- [ ] [String Encoded Data](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#name-a-vocabulary-for-the-conten)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

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
  '{"name": "John Doe", "address": {"street": "123 Main St", "city": "Anytown", "zip": "12345"}}',
);

console.log(person);
// { name: 'John Doe', address: { street: '123 Main St', city: 'Anytown', zip: '12345' } }
```

## API Reference

### Core API

- [Schema](./docs/json-schema.schema.md) - JSON Schema implementation
- [SchemaDefinition](./docs/json-schema.schemadefinition.md) - Namespace providing static type inference and type utilities for `Schema`

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - JSON Schema type including Object Schema and Boolean Schema types
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema

# @imhonglu/json-schema

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- JSON Schema 2020-12-draft 사양을 준수하는 라이브러리입니다.
- [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)를 기반으로 검증되었습니다.
- 스키마 정의에 기반한 **정적 유형 추론**을 지원합니다.

![demo-1](./assets/demo.gif)

## Table of Contents

- [Features](#features)
- [Implementation Status](#implementation-status)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Features

- [x] 타입 안전성이 보장된 스키마 정의와 중첩 지원
- [ ] `default` 값이 있는 속성이 `required` 배열에 포함될 때 타입 추론 지원
- [ ] 스키마 유효성 검사 메시지 및 오류 처리 사용자 정의

## Implementation Status

현재 총 1,563개의 테스트 케이스 중 1,487개가 통과되었습니다 (95.1%)

제외 항목:

- `defs`: 스키마 정의 관련 테스트로, 유효성 검사와 무관하여 제외하였습니다.
- `format`: optional 카테고리에 속하는 기능으로 제외하였습니다.

미지원 항목:

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
  required: ["street"], // ✅ 추론 타입: ["street", "city", "zip"]
}) {}
// ✅ 추론 타입: Address {
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
      // ✅ 추론 타입: string | null | undefined | ((...args: any[]) => string | null)
    },
  },
  required: ["name"],
}) {}

// ✅ 추론 타입: {
//   name: string;
//   address?: Address
//   deletedAt?: string | null
// }
```

### Usage with `new`

하위 스키마의 데이터를 전달하는 경우 자동으로 하위 스키마의 인스턴스를 생성합니다.

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

혹은 하위 스키마의 인스턴스를 직접 생성할 수도 있습니다.

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

`parse` 메서드는 문자열을 파싱하여 스키마 인스턴스를 생성합니다.
```ts
const person = Person.parse('{ "name": "John" }'); // Person
```

### Parsing with `safeParse`

`safeParse` 메서드를 통해 안전하게 파싱할 수 있습니다.

```ts
const person = Person.safeParse('{ "name": "John" }'); // SafeResult<Person>

if (person.success) {
  console.log(person.data); // Person
} else {
  console.error(person.error); // ValidationFailedError
}
```

### Serializing with `JSON.stringify`

`toJSON` 메서드가 구현되어 있어 `JSON.stringify`를 통해 직렬화할 수 있습니다.

```ts
const person = new Person({ name: "John" });
const json = JSON.stringify(person); // '{"name":"John","deletedAt":null}'
```

## API Reference

### Core API

- [Schema](./docs/json-schema.schema.md) - JSON Schema의 구현체로 모든 스키마 타입의 기본 클래스입니다
- [createSchemaClass](./docs/json-schema.createschemaclass.md) - JSON Schema 정의로부터 타입 안전한 스키마 클래스를 생성합니다
- [InferSchemaType](./docs/json-schema.inferschematype.md) - 스키마 정의로부터 TypeScript 타입을 자동으로 추론합니다
- [InferSchema](./docs/json-schema.inferschema.md) - 객체 타입으로부터 스키마 정의를 자동으로 추론합니다
- [ConstSchema](./docs/json-schema.constschema.md) - 단일 고정값만 허용하는 스키마를 정의합니다
- [EnumSchema](./docs/json-schema.enumschema.md) - 미리 정의된 값들 중 하나만 허용하는 스키마를 정의합니다
- [TypeSchema](./docs/json-schema.typeschema.md) - 기본 JSON 데이터 타입을 정의하는 스키마입니다
- [SchemaVariant](./docs/json-schema.schemavariant.md) - 라이브러리에서 지원하는 모든 스키마 타입을 포함합니다

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - Object Schema, Boolean Schema 타입을 포함한 JSON Schema 타입
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema


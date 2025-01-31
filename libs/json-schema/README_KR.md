# @imhonglu/json-schema

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- JSON Schema 2020-12-draft 사양을 준수하는 라이브러리입니다.
- [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite)를 기반으로 검증되었습니다.
- 스키마 정의에 기반한 **정적 타입 추론**을 지원합니다.

![demo-1](./assets/demo.gif)

## Table of Contents

- [Features](#features)
- [Implementation Status](#implementation-status)
- [Installation](#installation)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [API Reference](#api-reference)

## Features

- [x] 스키마 정의 시 TypeScript의 정적 타입 검사 지원
- [x] 스마트 타입 추론
  - [x] `required` 속성에 따른 필수/선택적 필드 추론
  - [x] `default` 값이 있는 필드의 타입 추론 / 함수 타입 지원
  - [x] 중첩된 객체의 타입 재귀적 추론
- [x] class 기반의 스키마 정의 지원
- [ ] 사용자 정의 기능
  - [ ] 스키마 유효성 검사 메시지 커스터마이징
  - [ ] 사용자 정의 에러 핸들링
  - [ ] 검증 규칙 확장 지원

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
  // street 속성을 필수로 정의
  required: ["street"],
}) {}

// ✅ 타입 추론 결과:
// {
//   street: string;   // 필수
//   city?: string;    // 선택
//   zip?: string;     // 선택
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
    address: Address, // 중첩된 Address 스키마
    createdAt: {
      type: "string",
      default: () => new Date().toISOString(),
    },
    // null 허용하는 문자열 필드
    deletedAt: {
      type: ["string", "null"],
      default: null,
    },
  },
  required: ["name", "createdAt", "deletedAt"],
}) {}

// ✅ 타입 추론 결과:
// {
//   name: string;                // 필수
//   address?: Address;           // 선택
//   createdAt: string;           // 필수
//   deletedAt: string | null;    // 필수
// }
```

### Usage with `new`

```ts
import { Person } from "./person.js";

// 객체 리터럴로 인스턴스 생성
const johnDoe = new Person({
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Toronto",
    zip: "M5H 2N2",
  },
});

// ✅ 결과:
// {
//   name: 'John Doe',
//   address: Address {
//     street: '123 Main St',
//     city: 'Toronto',
//     zip: 'M5H 2N2'
//   },
//   deletedAt: null
// }

// ✅ 속성 접근
console.log(johnDoe.name);            // 'John Doe'
console.log(johnDoe.address?.street); // '123 Main St'
console.log(johnDoe.deletedAt);       // null

// ✅ Address 인스턴스를 직접 생성하여 사용
const maryDoe = new Person({
  name: "Mary Doe",
  address: new Address({
    street: "456 Main St",
    city: "Toronto",
    zip: "M5H 2N2",
  }),
});
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


## Known Issues

### 인라인 스키마의 타입 추론 한계

인라인으로 정의된 하위 스키마의 경우 `required` 속성에 대한 타입 추론이 제대로 동작하지 않는 문제가 있습니다.

예를 들어

```ts
class Person extends createSchemaClass({
  type: "object",
  properties: {
    name: { type: "string" },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        zip: { type: "string" },
      },
      required: ["street"], // 이 제약사항이 제대로 적용되지 않음
    },
  },
  required: ["name"],
}) {}

// ❌ 잘못된 추론으로 타입 에러가 발생하지 않음
const person = new Person({
  name: "John Doe",
  address: {}, // street 속성이 필수임에도 타입 에러가 발생하지 않음
});
```

### 해결 방법: 독립적인 클래스로 분리

이 문제를 해결하기 위해서는 하위 스키마를 독립된 클래스로 정의해야 합니다.

```ts
// ✅ 별도의 클래스로 분리
class Address extends createSchemaClass({
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string" },
    zip: { type: "string" },
  },
  required: ["street"],
}) {}

class Person extends createSchemaClass({
  type: "object",
  properties: {
    name: { type: "string" },
    address: Address, // Address 클래스 참조
  },
  required: ["name"],
}) {}

const person = new Person({
  name: "John Doe",
  address: {}, // ✅ 타입 에러: street 속성이 필요함
});
```

## API Reference

### Core API

- [Schema](./docs/json-schema.schema.md) - JSON Schema의 구현체로 모든 스키마 타입의 기본 클래스입니다
- [createSchemaClass](./docs/json-schema.createschemaclass.md) - JSON Schema 정의로부터 타입 안전한 스키마 클래스를 생성합니다
- [InferSchemaInputType](./docs/json-schema.inferschemainputtype.md) - 스키마 정의로부터 스키마의 입력 타입을 추론합니다
- [InferSchemaType](./docs/json-schema.inferschematype.md) - 스키마 정의로부터 스키마의 타입을 추론합니다
- [InferSchema](./docs/json-schema.inferschema.md) - 스키마 유형을 추론합니다
- [ConstSchema](./docs/json-schema.constschema.md) - 단일 고정값만 허용하는 스키마를 정의합니다
- [EnumSchema](./docs/json-schema.enumschema.md) - 미리 정의된 값들 중 하나만 허용하는 스키마를 정의합니다
- [TypeSchema](./docs/json-schema.typeschema.md) - 기본 JSON 데이터 타입을 정의하는 스키마입니다
- [SchemaVariant](./docs/json-schema.schemavariant.md) - 라이브러리에서 지원하는 모든 스키마 타입을 포함합니다

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - Object Schema, Boolean Schema 타입을 포함한 JSON Schema 타입
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema


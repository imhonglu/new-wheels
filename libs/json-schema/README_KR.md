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
- [ ] 스키마 유효성 검사 메시지 및 오류 처리 사용자 정의

## Implementation Status

현재 총 1,747개의 테스트 케이스 중 1,581개가 통과되었습니다 (89.3%)

다음 항목들은 제외되었습니다:

- `defs`: 스키마 정의 관련 테스트로, 유효성 검사와 무관하여 제외
- `format`: optional 카테고리에 속하는 기능으로 제외

### Remaining Test Suite Status

| 이름 | 진행률 (통과/전체) | 상태 |
|---------|-----------------|------|
| not | 89% (8/9) | 🟢 완료 |
| ref | 83% (64/77) | 🟡 진행중 |
| optional/format | 76% (16/21) | 🟡 진행중 |
| optional/ecmascript-regex | 80% (16/20) | 🟡 진행중 |
| unevaluated-properties | 73% (89/122) | 🟡 진행중 |
| unevaluated-items | 70% (46/66) | 🟡 진행중 |
| dynamicRef | 20% (4/20) | 🔴 시작 |
| optional/dependencies-compatibility | 14% (1/7) | 🔴 시작 |
| anchor | 0% (0/4) | ⚪ 미시작 |
| optional/anchor | 0% (0/1) | ⚪ 미시작 |
| optional/dynamicRef | 0% (0/1) | ⚪ 미시작 |
| optional/float-overflow | 0% (0/1) | ⚪ 미시작 |
| optional/non-bmp-regex | 0% (0/2) | ⚪ 미시작 |
| optional/ref-of-unknown-keyword | 0% (0/3) | ⚪ 미시작 |
| ref-remote | 0% (0/15) | ⚪ 미시작 |
| vocabularies | 0% (0/5) | ⚪ 미시작 |

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

- [Schema](./docs/json-schema.schema.md) - JSON Schema 구현체
- [SchemaDefinition](./docs/json-schema.schemadefinition.md) - `Schema`의 정적 타입 추론 및 타입 유틸리티를 제공하는 Namespace

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema.jsonschema.md) - Object Schema, Boolean Schema 타입을 포함한 JSON Schema 타입
- [ObjectSchema](./docs/json-schema.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema.booleanschema.md) - Boolean Schema


# @imhonglu/json-schema-typed

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

JSON Schema를 타입 안전하게 사용하기 위한 도구입니다. TypeScript의 타입 시스템을 활용하여 JSON Schema의 타입 안전성을 보장합니다.

## Features

- 타입 안전한 스키마 정의: `defineSchema`를 통해 JSON Schema를 타입 안전하게 정의할 수 있습니다.
- 스키마 인스턴스 타입 추론: `SchemaInstanceType`을 통해 JSON Schema를 TypeScript 타입으로 변환할 수 있습니다.

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

`defineSchema` 함수는 JSON Schema를 정의할 때 TypeScript의 타입 추론을 도와주는 헬퍼 함수입니다. 이 함수는 컴파일 타임에 JSON Schema의 유효성을 검사하고, 런타임에서는 입력된 스키마를 그대로 반환합니다.

```ts
import { defineSchema } from '@imhonglu/json-schema-typed';

// 스키마 정의 예시
const schema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  // ✅ required 필드에 입력할 때 properties의 키가 자동으로 추론됩니다.
  required: ["name", "age"],
});

// 에러 케이스
const invalidSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
  },
  // ❌ age는 properties에 정의되지 않았으므로 에러
  required: ["name", "age"],
});
```

### SchemaInstanceType

`SchemaInstanceType`은 JSON Schema의 인스턴스 타입을 추론하는 유틸리티 타입입니다. 이 타입을 사용하면 JSON Schema 정의에 따라 올바른 타입의 데이터만 사용할 수 있습니다.

#### Using with defineSchema

```ts
import { defineSchema, type SchemaInstanceType } from '@imhonglu/json-schema-typed';

// 스키마 정의
const userSchema = defineSchema({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name"],
});

// 타입 추론
type UserType = SchemaInstanceType<typeof userSchema>;
// { name: string; age?: number }

// 사용 예시
const user: UserType = {
  name: "John",
  age: 20  // ✅ 선택적 필드
};

// 에러 케이스
const invalidUser: UserType = {
  age: 20,
  // ❌ name 필드 누락
};
```

#### Primitive Types

```ts
import type { SchemaInstanceType } from '@imhonglu/json-schema-typed';

// 기본 타입 예시
type StringType = SchemaInstanceType<{ type: "string" }>;  // 문자열 타입
type NumberType = SchemaInstanceType<{ type: "number" }>;  // 숫자 타입
type BooleanType = SchemaInstanceType<{ type: "boolean" }>; // 불리언 타입
type NullType = SchemaInstanceType<{ type: "null" }>;      // null 타입

// 사용 예시
const str: StringType = "hello";  // ✅
const num: NumberType = 42;       // ✅
const bool: BooleanType = true;   // ✅
const nul: NullType = null;       // ✅

// 에러 케이스
const invalidStr: StringType = 42;      // ❌ 숫자 타입 불가
const invalidNum: NumberType = "42";    // ❌ 문자열 타입 불가
const invalidBool: BooleanType = 1;     // ❌ 숫자 타입 불가
const invalidNul: NullType = undefined; // ❌ undefined 불가
```

#### Object Types

```ts
// 모든 필드가 필수인 경우
type RequiredUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: ["name", "age"];
}>;
// { name: string; age: number }

// 사용 예시
const requiredUser: RequiredUserType = {
  name: "John",
  age: 20  // ✅ 모든 필드 필수
};

// 에러 케이스
const invalidRequiredUser: RequiredUserType = {
  name: "John"
  // ❌ age 필드 누락
};

// 일부 필드가 선택적인 경우
type OptionalUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: ["name"];
}>;
// { name: string; age?: number }

// 사용 예시
const optionalUser: OptionalUserType = {
  name: "John",  // ✅ age는 선택적
};

// 모든 필드가 선택적인 경우
type AllOptionalUserType = SchemaInstanceType<{
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "number" };
  };
  required: [];
}>;
// { name?: string; age?: number }

// 사용 예시
const allOptionalUser: AllOptionalUserType = {};  // ✅ 모든 필드 선택적
```

#### Array Types

```ts
// 기본 배열 타입
type StringArrayType = SchemaInstanceType<{
  type: "array";
  items: { type: "string" };
}>;
// string[]

// 사용 예시
const fruits: StringArrayType = ["apple", "banana", "orange"];  // ✅

// 에러 케이스
const invalidFruits = [1, 2, 3];  // ❌ 숫자 타입 불가

// 객체 배열 타입
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

// 사용 예시
const users: UserArrayType = [
  { name: "John", age: 20 },  // ✅
  { name: "Jane" }            // ✅ age는 선택적
];

// 에러 케이스
const invalidUsers: UserArrayType = [
  { age: 20 }  // ❌ name 필드 누락
];
```

#### Enum and Const

```ts
// enum 타입
type FruitType = SchemaInstanceType<{
  enum: ["apple", "banana", "orange"];
}>;
// "apple" | "banana" | "orange"

// 사용 예시
const fruit: FruitType = "apple";  // ✅

// 에러 케이스
const invalidFruit: FruitType = "watermelon";  // ❌ 허용되지 않은 값

// const 타입
type HelloType = SchemaInstanceType<{
  const: "hello";
}>;
// "hello"

// 사용 예시
const hello: HelloType = "hello";  // ✅

// 에러 케이스
const invalidHello: HelloType = "world";  // ❌ 다른 값 불가
```

### Creatable

`Creatable`은 JSON Schema의 인스턴스를 생성할 때 필요한 데이터 유형을 추론하는 유틸리티 타입입니다. 이 타입을 사용하면 필수 필드와 선택적 필드를 명확히 구분할 수 있습니다.

```ts
import { defineSchema, type SchemaInstanceType, type Creatable } from '@imhonglu/json-schema-typed';

// 스키마 정의
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

// 타입 정의
type NewUser = Creatable<typeof userSchema>;      // 입력 타입
type User = SchemaInstanceType<typeof userSchema>;  // 결과 타입
// NewUser: { name: string; age: number; createdAt?: string }
// User: { name: string; age: number; createdAt: string }

// 실제 인스턴스 생성
const createUser = (input: NewUser): User => {
  // input의 타입이 Creatable에 의해 검증됨
  return {
    ...input,
    createdAt: input.createdAt ?? new Date().toISOString()
  };
};

// 올바른 사용 예시
const validUser: NewUser = {
  name: "John",
  age: 20
  // ✅ createdAt은 선택적이며 기본값이 있음
};

const user: User = createUser(validUser);
// ✅ user.createdAt은 항상 존재하는 필드

// 잘못된 사용 예시
const invalidUser: NewUser = {
  name: "John",
  // ❌ age 필드 누락
};
```

## API Reference

### Core API

- [defineSchema](./docs/json-schema-typed.defineschema.md) - JSON Schema를 타입 안전하게 정의하는 헬퍼 함수
- [SchemaInstanceType](./docs/json-schema-typed.schemainstancetype.md) - JSON Schema의 인스턴스 타입을 추론하는 유틸리티 타입
- [Creatable](./docs/json-schema-typed.creatable.md) - JSON Schema의 인스턴스 생성에 필요한 데이터 유형을 추론하는 유틸리티 타입

### JSON Schema Specification Types

- [JsonSchema](./docs/json-schema-typed.jsonschema.md) - Object Schema, Boolean Schema 타입을 포함한 JSON Schema 타입
- [ObjectSchema](./docs/json-schema-typed.objectschema.md) - Object Schema
- [BooleanSchema](./docs/json-schema-typed.booleanschema.md) - Boolean Schema
# @imhonglu/type-guard

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A library providing zero dependencies type guard utilities.
- Provides a chaining API inspired by Jest's matcher pattern.
- Built on `Proxy` to minimize overhead and ensure type safety.

![demo-1](./assets/demo-1.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/type-guard
```

## Usage

Type guards created using the `composeGuards` function can be negated using the `not` key.

For detailed usage examples, please refer to the [API Reference](#api-reference).

```ts
import { composeGuards } from '@imhonglu/type-guard';

// Composing type guards
const has = composeGuards({
	length: (value: unknown): value is object & { length: number } =>
		typeof value === "object" && value !== null && "length" in value,
});
// {
//   length: [Function];
//   not: {
//     length: [Function];
//   };
// }

let value: unknown[] | number | undefined;

if (has.length(value)) { ... } // value is unknown[]
if (has.not.length(value)) { ... } // value is number | undefined
```

## API Reference

- [composeGuards](./docs/type-guard.composeguards.md) - compose type guards
- [negateGuards](./docs/type-guard.negateguards.md) - negate type guards
- [negateGuard](./docs/type-guard.negateguard.md) - negate single type guard

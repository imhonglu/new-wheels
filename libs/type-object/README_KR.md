# @imhonglu/type-object

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- 종속성 없는 타입 안전한 [Object API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) Wrapper 를 제공합니다.
- 네이티브 동작에 가까운 타입을 제공합니다.
- 지원하는 API
  - `Object.keys`
  - `Object.entries`
  - `Object.fromEntries`
  - `Object.hasOwn`

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/type-object
```

## Usage

자세한 용례는 [API Reference](#api-reference) 에서 확인할 수 있습니다.

```ts
import * as TypeObject from '@imhonglu/type-object';

const data = { a: 1, b: 2, c: 3 };

for (const key of TypeObject.keys(data)) {
  // key: "a" | "b" | "c"
  console.log(data[key]); // number
}
```

```ts
import * as TypeObject from '@imhonglu/type-object';

const string = 'hello';

for (const index of TypeObject.keys(string)) {
  // index: number & keyof string
  console.log(string[index]); // string
}
```

```ts
import * as TypeObject from '@imhonglu/type-object';

const data: unknown = { name: 'John' };

if (TypeObject.hasOwn(data, 'name')) {
  // data: unknown & { name: unknown }
  console.log(data.name);
}
```

## API Reference

- [keys](./docs/type-object.keys.md) - `Object.keys` wrapper
- [entries](./docs/type-object.entries.md) - `Object.entries` wrapper
- [fromEntries](./docs/type-object.fromEntries.md) - `Object.fromEntries` wrapper
- [hasOwn](./docs/type-object.hasOwn.md) - `Object.hasOwn` wrapper

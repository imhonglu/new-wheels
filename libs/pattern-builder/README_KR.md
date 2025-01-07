# @imhonglu/pattern-builder

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- 종속성 없이 사용할 수 있는 정규표현식(RegExp) 빌더 라이브러리입니다.
- 모든 패턴은 `toRegExp` 메서드를 통해 정규표현식으로 변환됩니다.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/pattern-builder
```

## Usage

URI Spec 중 `userinfo` 패턴을 만들어보는 예제입니다.

자세한 용례는 [API Reference](#api-reference) 에서 확인할 수 있습니다.

```ts
// constants.ts
import { characterSet, concat, hexDigit } from "@imhonglu/pattern-builder";

// pct-encoded = "%" HEXDIG HEXDIG
export const pctEncoded = concat(
	"%",
	hexDigit.clone().exact(2),
);

// unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
export const unreserved = characterSet(
	alpha,
	digit,
	/[\-._~]/,
);

// sub-delims = "!" / "$" / "&" / "'" / "(" / ")"
//            / "*" / "+" / "," / ";" / "="
export const subDelims = characterSet(/[!$&'()*+,;=]/);
```

```ts
// userinfo.ts
import { oneOf, characterSet } from "@imhonglu/pattern-builder";
import { pctEncoded, subDelims, unreserved } from "./constants.js";

const pattern = oneOf(pctEncoded, characterSet(unreserved, subDelims, ":"))
		.nonCapturingGroup()
		.oneOrMore()
	.anchor()
	.toRegExp();

console.log(pattern.test("user:pass")); // true
console.log(pattern.test("@")); // false
console.log(pattern.test("@:@")); // false
```

## API Reference

### Pattern Functions

- [characterSet](./docs/pattern-builder.characterset.md) - 문자 집합 생성
- [concat](./docs/pattern-builder.concat.md) - 문자열 연결
- [oneOf](./docs/pattern-builder.oneof.md) - 여러 패턴 중 하나 선택

### Pre-defined Patterns

- [alpha](./docs/pattern-builder.alpha.md) - `/[a-zA-Z]/`
- [digit](./docs/pattern-builder.digit.md) - `/[\d]/`
- [hexDigit](./docs/pattern-builder.hexdigit.md) - `/[\da-fA-F]/`


### Pattern Builder Classes

- [PatternBuilder](./docs/pattern-builder.patternbuilder.md) - 기본이 되는 Builder class
- [Characters](./docs/pattern-builder.characters.md) - 캐릭터 집합을 만들기 위한 Builder class

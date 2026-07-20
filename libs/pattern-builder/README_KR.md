# @imhonglu/pattern-builder

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- 종속성 없이 사용할 수 있는 정규표현식(RegExp) 빌더 라이브러리입니다.
- 리터럴 텍스트, 정규표현식 문법, 재사용 가능한 패턴을 fluent API로 조합할 수 있습니다.

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
import { alpha, digit, hexDigit, pattern } from "@imhonglu/pattern-builder";

// pct-encoded = "%" HEXDIG HEXDIG
export const pctEncoded = pattern("%", hexDigit.exact(2));

// unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
export const unreserved = pattern.characterSet(alpha, digit, pattern.raw("\\-._~"));

// sub-delims = "!" / "$" / "&" / "'" / "(" / ")"
//            / "*" / "+" / "," / ";" / "="
export const subDelims = pattern.raw("[!$&'()*+,;=]");
```

```ts
// userinfo.ts
import { pattern } from "@imhonglu/pattern-builder";
import { pctEncoded, subDelims, unreserved } from "./constants.js";

const userinfo = pattern(pctEncoded)
  .or(pattern.characterSet(unreserved, subDelims, ":"))
  .nonCapturingGroup()
  .oneOrMore()
  .anchor()
  .compile();

console.log(userinfo.test("user:pass")); // true
console.log(userinfo.test("@")); // false
console.log(userinfo.test("@:@")); // false
```

## API Reference

- [패키지 API](./docs/pattern-builder.md)
- [pattern](./docs/pattern-builder.pattern.md) - 리터럴 및 raw 패턴 조합
- [PatternBuilder](./docs/pattern-builder.patternbuilder.md) - 패턴 생성 및 컴파일
- [RegexNode](./docs/pattern-builder.regexnode.md) - 패턴 AST 노드의 기반 클래스

### Pre-defined Patterns

- [alpha](./docs/pattern-builder.alpha.md) - `/[a-zA-Z]/`
- [digit](./docs/pattern-builder.digit.md) - `/[0-9]/`
- [hexDigit](./docs/pattern-builder.hexdigit.md) - `/[0-9a-fA-F]/`

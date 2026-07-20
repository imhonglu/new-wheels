# @imhonglu/pattern-builder

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A RegExp builder library that can be used without dependencies.
- Literal text, raw regular expression syntax, and reusable patterns can be composed with a fluent API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/pattern-builder
```

## Usage

Here's an example of creating a `userinfo` pattern from the URI specification.

For detailed usage, please refer to the [API Reference](#api-reference).

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

- [Package API](./docs/pattern-builder.md)
- [pattern](./docs/pattern-builder.pattern.md) - Compose literal and raw patterns
- [PatternBuilder](./docs/pattern-builder.patternbuilder.md) - Build and compile patterns
- [RegexNode](./docs/pattern-builder.regexnode.md) - Base class for pattern AST nodes

### Pre-defined Patterns

- [alpha](./docs/pattern-builder.alpha.md) - `/[a-zA-Z]/`
- [digit](./docs/pattern-builder.digit.md) - `/[0-9]/`
- [hexDigit](./docs/pattern-builder.hexdigit.md) - `/[0-9a-fA-F]/`

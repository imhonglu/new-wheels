# @imhonglu/pattern-builder

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

- A RegExp builder library that can be used without dependencies.
- All patterns are converted to regular expressions through the `toRegExp` method.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/pattern-builder
```

## Usage

Here's an example of creating a `userinfo` pattern from URI Spec.

For detailed usage, please refer to the [API Reference](#api-reference).

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

- [characterSet](./docs/pattern-builder.characterset.md) - Create character set
- [concat](./docs/pattern-builder.concat.md) - Concatenate strings
- [oneOf](./docs/pattern-builder.oneof.md) - Select one of multiple patterns

### Pre-defined Patterns

- [alpha](./docs/pattern-builder.alpha.md) - `/[a-zA-Z]/`
- [digit](./docs/pattern-builder.digit.md) - `/[\d]/`
- [hexDigit](./docs/pattern-builder.hexdigit.md) - `/[\da-fA-F]/`

### Pattern Builder Classes

- [PatternBuilder](./docs/pattern-builder.patternbuilder.md) - Base Builder class
- [Characters](./docs/pattern-builder.characters.md) - Builder class for creating character sets

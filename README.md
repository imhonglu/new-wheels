# @imhonglu/new-wheels

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

This project started with the mindset of "Let's create type-safe libraries that match my preferences."  
The goal is to minimize unnecessary dependencies while maintaining high test coverage,   
focusing on designing libraries with excellent type inference capabilities.

## Libraries

You can find detailed information about each library by visiting their respective documentation.

### [@imhonglu/format](https://github.com/imhonglu/new-wheels/blob/main/libs/format/README.md)

- A strongly-typed string formatting library that complies with RFC standards.
- Provides an API similar to the native [JSON API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON).

### [@imhonglu/json-schema](https://github.com/imhonglu/new-wheels/blob/main/libs/json-schema/README.md)

- A library that complies with JSON Schema 2020-12-draft specification.
- Validated based on [JSON-Schema-test-suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).
- Supports **static type inference** based on schema definitions.

### [@imhonglu/pattern-builder](https://github.com/imhonglu/new-wheels/blob/main/libs/pattern-builder/README.md)

- A RegExp builder designed to improve the readability of regular expressions.

### [@imhonglu/toolkit](https://github.com/imhonglu/new-wheels/blob/main/libs/toolkit/README.md)

- A library containing commonly used utility functions and types.

### [@imhonglu/type-guard](https://github.com/imhonglu/new-wheels/blob/main/libs/type-guard/README.md)

- Provides a chaining API inspired by [Jest](https://jestjs.io/) Matcher patterns.
- Operates on a `Proxy` basis to minimize overhead and ensure type safety.

### [@imhonglu/type-object](https://github.com/imhonglu/new-wheels/blob/main/libs/type-object/README.md)

- Provides a type-safe wrapper for [Object API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object).
- Provides types that closely match native behavior.
- Supported APIs:
  - `Object.keys`
  - `Object.entries`
  - `Object.fromEntries`
  - `Object.hasOwn`

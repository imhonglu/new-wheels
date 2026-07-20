# @imhonglu/new-wheels

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

This project started with the idea of **"creating a type-safe library that fits my preferences."**
It focuses on **minimizing unnecessary dependencies and achieving high test coverage** while
leveraging **TypeScript's type system to design safe and intuitive libraries.**

## Development

- [Contributing guide](./CONTRIBUTING.md)
- [Architecture and maintenance documentation](./docs/README.md)

## Libraries

For detailed information about each library, please refer to the respective documentation.

- [@imhonglu/json-schema](./libs/json-schema/README.md)
  A JSON Schema 2020-12 Draft-compliant implementation, validated with the JSON-Schema-test-suite.
  **Supports schema-based static type inference, allowing you to define safe data structures declaratively.**
- [@imhonglu/json-schema-typed](./libs/json-schema-typed/README.md)
  A toolkit for type-safe JSON Schema definitions and instance type inference.
  **Provides compile-time schema checks and schema-driven TypeScript types.**
- [@imhonglu/format](./libs/format/README.md)
  A strongly typed string formatting library compliant with RFC standards.
  **Provides an API similar to the native JSON API for intuitive usability.**
- [@imhonglu/pattern-builder](./libs/pattern-builder/README.md)
  A RegExp builder that simplifies complex regular expressions.
  **Improves readability and makes maintenance easier.**
- [@imhonglu/toolkit](./libs/toolkit/README.md)
  A collection of commonly used utility functions and types, designed to enhance development efficiency.
  **Helps reduce repetitive code and maintain consistent patterns in TypeScript projects.**
- [@imhonglu/type-guard](./libs/type-guard/README.md)
  A type guard library inspired by Jest matchers, providing a chainable API.
  **Uses Proxy-based implementation to minimize overhead while ensuring strong type safety.**
- [@imhonglu/type-object](./libs/type-object/README.md)
  A type-safe wrapper for Object APIs that closely aligns with native behavior.
  **Enhances safety when working with `Object.keys`, `entries`, `fromEntries`, `hasOwn`, and similar APIs in TypeScript.**

# @imhonglu/toolkit

[English](./README.md) | [한국어](./README_KR.md)

## Introduction

A collection of utility functions and types that are frequently used in projects.
## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)

## Installation

```bash
npm install @imhonglu/toolkit
```

## API Reference

### Array Utilities
- [combinations](./docs/toolkit.combinations.md) - Generate all possible combinations from an array
- [chunk](./docs/toolkit.chunk.md) - Split an array into chunks of specified size

### Object Utilities
- [clone-prototype](./docs/toolkit.cloneprototype.md) - Clone objects including their prototype chain
- [invert](./docs/toolkit.invert.md) - Swap object keys and values
- [pick](./docs/toolkit.pick.md) - Create an object with selected properties
- [omit](./docs/toolkit.omit.md) - Create an object excluding specified properties

### Function Utilities
- [memoize](./docs/toolkit.memoize.md) - Memoize function results for better performance
- [get-callsites](./docs/toolkit.getcallsites.md) - Retrieve call stack information
- [create-safe-executor](./docs/toolkit.createsafeexecutor.md) - Create a safe function executor
- [is-async-function](./docs/toolkit.isasyncfunction.md) - Check if a function is asynchronous

### Type Utilities
- [literal-union](./docs/toolkit.literalunion.md) - Literal union type utilities
- [fn](./docs/toolkit.fn.md) - Function type utilities
- [or](./docs/toolkit.or.md) - Union type utilities
- [primitive](./docs/toolkit.primitive.md) - Primitive type utilities
- [mutable](./docs/toolkit.mutable.md) - Mutable type utilities
- [nullish-value](./docs/toolkit.nullishvalue.md) - Nullish type utilities

### String Utilities
- [string-case](./docs/toolkit.stringcase.md) - String case conversion utilities

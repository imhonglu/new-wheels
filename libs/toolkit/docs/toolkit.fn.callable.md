<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/toolkit](./toolkit.md) &gt; [Fn](./toolkit.fn.md) &gt; [Callable](./toolkit.fn.callable.md)

## Fn.Callable interface

Interface for callable functions with generic type support

**Signature:**

```typescript
interface Callable<T extends Definition = Definition> extends CallableFunction 
```
**Extends:** CallableFunction

## Example


```ts
type A = Callable<{ args: [number, string]; return: boolean }>;
// (number, string) => boolean

type B = Callable<{ args: [number, string]; }>;
// (number, string) => any;

type C = Callable<{ return: string }>;
// (...args: any[]) => string;
```


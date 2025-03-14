<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [ResolveJsonPointer](./format.resolvejsonpointer.md)

## ResolveJsonPointer type

Resolves the type of value at a given JSON Pointer path.

**Signature:**

```typescript
export type ResolveJsonPointer<T, S extends PointerPaths<T> = ""> = S extends "" ? T : ResolvePointerSegments<T, SplitJsonPointer<S extends `/${infer Rest}` ? Rest : S>>;
```
**References:** [PointerPaths](./format.pointerpaths.md)<!-- -->, [ResolvePointerSegments](./format.resolvepointersegments.md)<!-- -->, [SplitJsonPointer](./format.splitjsonpointer.md)

## Remarks

- Returns the source type for empty path ("") - Returns the type at the specified path if it exists - Handles array indices and nested object properties - Automatically unescapes special characters in the path

## Example


```ts
interface Example {
  items: Array<{ id: number }>;
}

type T1 = ResolveJsonPointer<Example, "">; // Example
type T2 = ResolveJsonPointer<Example, "/items">; // Array<{ id: number }>
type T3 = ResolveJsonPointer<Example, "/items/0/id">; // number
```


<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [SplitJsonPointer](./format.splitjsonpointer.md)

## SplitJsonPointer type

**Signature:**

```typescript
export type SplitJsonPointer<S extends string> = S extends `${infer First}/${infer Rest}` ? [UnescapeSegment<First>, ...SplitJsonPointer<Rest>] : [UnescapeSegment<S>];
```
**References:** [UnescapeSegment](./format.unescapesegment.md)<!-- -->, [SplitJsonPointer](./format.splitjsonpointer.md)


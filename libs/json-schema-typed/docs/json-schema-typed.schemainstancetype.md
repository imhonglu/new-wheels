<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/json-schema-typed](./json-schema-typed.md) &gt; [SchemaInstanceType](./json-schema-typed.schemainstancetype.md)

## SchemaInstanceType type

**Signature:**

```typescript
export type SchemaInstanceType<T> = T extends BooleanSchema ? unknown : T extends {
    const: infer U;
} ? U : T extends {
    enum: infer U;
} ? ArrayElement<U> : T extends {
    type: infer U;
} ? Match<U, SchemaInstanceTypeMap<T>> : never;
```
**References:** [BooleanSchema](./json-schema-typed.booleanschema.md)<!-- -->, [Match](./json-schema-typed.match.md)<!-- -->, [SchemaInstanceTypeMap](./json-schema-typed.schemainstancetypemap.md)


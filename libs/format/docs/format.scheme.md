<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [Scheme](./format.scheme.md)

## Scheme class

The Scheme formatter based on RFC 3986.

**Signature:**

```typescript
export declare class Scheme 
```

## Example


```ts
Scheme.parse("http");
// {
//   text: "http",
// }
```

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)({ text })](./format.scheme._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Scheme` class


</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[safeParse](./format.scheme.safeparse.md)


</td><td>

`static`


</td><td>

SafeExecutor&lt;typeof Scheme.parse&gt;


</td><td>


</td></tr>
<tr><td>

[text](./format.scheme.text.md)


</td><td>

`readonly`


</td><td>

string


</td><td>


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[parse(text)](./format.scheme.parse.md)


</td><td>

`static`


</td><td>

Converts a Scheme string to a [Scheme](./format.scheme.md) object.


</td></tr>
<tr><td>

[stringify(value)](./format.scheme.stringify.md)


</td><td>

`static`


</td><td>

Converts a [Scheme](./format.scheme.md) object to a Scheme string.


</td></tr>
</tbody></table>
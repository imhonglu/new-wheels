<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@imhonglu/format](./format.md) &gt; [Fragment](./format.fragment.md)

## Fragment class

The Fragment formatter based on RFC 3986.

**Signature:**

```typescript
export declare class Fragment 
```

## Example


```ts
Fragment.parse("section1"); // { text: "section1" }
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

[(constructor)({ text, options })](./format.fragment._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `Fragment` class


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

[options?](./format.fragment.options.md)


</td><td>

`readonly`


</td><td>

[URIParseOptions](./format.uriparseoptions.md)


</td><td>

_(Optional)_


</td></tr>
<tr><td>

[safeParse](./format.fragment.safeparse.md)


</td><td>

`static`


</td><td>

SafeExecutor&lt;typeof Fragment.parse&gt;


</td><td>


</td></tr>
<tr><td>

[text](./format.fragment.text.md)


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

[parse(text, options)](./format.fragment.parse.md)


</td><td>

`static`


</td><td>

Converts a Fragment string to a [Fragment](./format.fragment.md) object.


</td></tr>
<tr><td>

[stringify(value)](./format.fragment.stringify.md)


</td><td>

`static`


</td><td>

Converts a [Fragment](./format.fragment.md) object to a Fragment string.


</td></tr>
<tr><td>

[toString()](./format.fragment.tostring.md)


</td><td>


</td><td>


</td></tr>
</tbody></table>
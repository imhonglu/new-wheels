import type { SafeExecutor } from "@imhonglu/toolkit";
import { Serializable } from "../utils/serializable/serializable.js";
import { VARIABLE_SEPARATOR } from "./constants.js";
import { InvalidURITemplateError } from "./errors/invalid-uri-template-error.js";
import type { InvalidVarspecError } from "./errors/invalid-varspec-error.js";
import type { Expression } from "./types/expression.js";
import type { Operator } from "./types/operator.js";
import type { Variable } from "./types/variable.js";
import { expandExpression } from "./utils/expand-expression.js";
import { isOperator } from "./utils/is-operator.js";
import { replaceRange } from "./utils/replace-range.js";
import { Varspec } from "./varspec.js";

/**
 * The URITemplate formatter based on RFC 6570.
 *
 * @example
 * ```ts
 * URITemplate.parse("https://api.example.com/users/{userId}/posts/{postId}")
 * // {
 * //   text: "https://api.example.com/users/{userId}/posts/{postId}",
 * //   expressions: new Set([{ ... }]),
 * // }
 * ```
 *
 * @example
 * ```ts
 * URITemplate.parse("/search{?q,page,limit}")
 * // {
 * //   text: "/search{?q,page,limit}",
 * //   expressions: new Set([{ ... }]),
 * // }
 * ```
 *
 * @example
 * ```ts
 * URITemplate.parse("{/path*}/resource")
 * // {
 * //   text: "{/path*}/resource",
 * //   expressions: new Set([{ ... }]),
 * // }
 * ```
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6570#section-2 | RFC 6570#section-2}
 */
@Serializable
export class URITemplate {
	public readonly text: string;
	public readonly expressions: Set<Expression>;

	public constructor({ text, expressions }: URITemplate) {
		this.text = text;
		this.expressions = expressions;
	}

	public static safeParse: SafeExecutor<typeof URITemplate.parse>;

	/**
	 * Converts a URITemplate string to a {@link URITemplate} object.
	 *
	 * @param text - A valid URITemplate string. e.g. "https://api.example.com/users/\{userId\}/posts/\{postId\}"
	 * @throws - {@link InvalidURITemplateError}
	 * @throws - {@link InvalidVarspecError}
	 */
	public static parse(text: string): URITemplate {
		const expressions = new Set<Expression>();

		let startIndex = -1;
		let variableList = "";

		for (let i = 0; i < text.length; i++) {
			const char = text[i];

			if (char === "{") {
				startIndex = i;
				continue;
			}

			if (char !== "}") {
				if (startIndex !== -1) {
					variableList += char;
				}
				continue;
			}

			if (startIndex === -1 || variableList.length === 0) {
				throw new InvalidURITemplateError(text);
			}

			let operator: Operator | undefined;

			if (isOperator(variableList[0])) {
				operator = variableList[0];
				variableList = variableList.slice(1);
			}

			expressions.add({
				operator,
				variables: variableList
					.split(VARIABLE_SEPARATOR)
					.reduce((acc, varSpec) => {
						const spec = Varspec.parse(varSpec);

						if (acc.has(spec.name)) {
							throw new InvalidURITemplateError(text);
						}

						return acc.set(spec.name, spec);
					}, new Map<string, Varspec>()),
				index: [startIndex, i + 1],
			});

			startIndex = -1;
			variableList = "";
		}

		if (variableList.length > 0) {
			throw new InvalidURITemplateError(text);
		}

		return new URITemplate({
			text,
			expressions: expressions,
		});
	}

	/**
	 * Expands a {@link URITemplate} with provided values
	 *
	 * @param template - {@link URITemplate} object or string
	 * @param values - Values to substitute into the template
	 * @example
	 * ```ts
	 * URITemplate.expand("/users/\{id\}", \{ id: "123" \})
	 * // => "/users/123"
	 *
	 * URITemplate.expand("/search\{?q,page\}", \{ q: "test", page: "1" \})
	 * // => "/search?q=test&page=1"
	 * ```
	 */
	public static expand(
		template: URITemplate | string,
		values: Record<string, Variable>,
	): string {
		const parsed =
			typeof template === "string" ? URITemplate.parse(template) : template;

		let result = parsed.text;
		let offset = 0;

		for (const expression of parsed.expressions) {
			const start = expression.index[0] + offset;
			const end = expression.index[1] + offset;
			const expanded = expandExpression(expression, values);

			result = replaceRange(result, [start, end], expanded);
			offset += expanded.length - (end - start);
		}

		return result;
	}

	public static stringify(value: URITemplate): string {
		return value.text;
	}
}

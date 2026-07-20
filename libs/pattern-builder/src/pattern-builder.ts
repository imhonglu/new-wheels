import { AlternationNode } from "./ast/alternation-node.js";
import { AnchorNode, type AnchorPosition } from "./ast/anchor-node.js";
import { GroupNode, type GroupType } from "./ast/group-node.js";
import {
  QuantifierNode,
  type QuantifierOptions,
} from "./ast/quantifier-node.js";
import { RawNode } from "./ast/raw-node.js";
import { RegexNode } from "./ast/regex-node.js";
import { SequenceNode } from "./ast/sequence-node.js";
import { TextNode } from "./ast/text-node.js";
import type { PatternFlag } from "./types/pattern-flag.js";

/** A value that can be composed into a pattern. */
export type PatternInput = string | PatternBuilder | RegExp | RegexNode;

/** A callback helper that appends inputs to the current pattern. */
export type PatternFactory = (...inputs: PatternInput[]) => PatternBuilder;

function toNode(input: PatternInput): RegexNode {
  return input instanceof RegexNode
    ? input
    : input instanceof PatternBuilder
      ? input.node
      : new RawNode(input);
}

/**
 * An immutable, fluent builder for composing regular expressions.
 *
 * String inputs are escaped as literal text. Use `PatternBuilder.raw()` when
 * regular expression syntax should be preserved.
 *
 * @example
 * ```ts
 * const identifier = pattern(alpha, pattern.characterSet(alpha, digit).zeroOrMore())
 *   .anchor()
 *   .compile();
 *
 * identifier.test("item2"); // true
 * identifier.test("2items"); // false
 * ```
 */
export class PatternBuilder {
  /** The AST node represented by this builder. */
  public readonly node: RegexNode;

  /**
   * Creates a builder from an unescaped regular expression source.
   *
   * @param source - A source string or regular expression. RegExp flags are ignored.
   */
  static raw(source: string | RegExp): PatternBuilder {
    return new PatternBuilder(new RawNode(source));
  }

  /**
   * Creates a character set from the given pattern inputs.
   *
   * Existing outer character-set brackets are removed before composition.
   *
   * @param patterns - The patterns to include in the character set.
   */
  static characterSet(...patterns: PatternInput[]): PatternBuilder {
    const nodes = patterns.map((pattern) => {
      const value = toNode(pattern).toString();

      return value.startsWith("[") && value.endsWith("]")
        ? value.slice(1, -1)
        : value;
    });

    return PatternBuilder.raw(`[${nodes.join("")}]`);
  }

  /**
   * Creates a builder by concatenating the given pattern inputs.
   *
   * String inputs are escaped and other inputs preserve their regular expression source.
   *
   * @param inputs - The values to concatenate in order.
   */
  constructor(...inputs: PatternInput[]) {
    const nodes = inputs
      .map((input) =>
        typeof input === "string" ? new TextNode(input) : toNode(input),
      )
      .filter(
        (node) => !(node instanceof SequenceNode && node.children.length === 0),
      );

    this.node =
      nodes.length === 0
        ? new SequenceNode([])
        : nodes.length === 1
          ? nodes[0]
          : new SequenceNode(nodes);
  }

  /**
   * Appends an unescaped regular expression source.
   *
   * @param source - A source string or regular expression. RegExp flags are ignored.
   */
  raw(source: string | RegExp): PatternBuilder {
    return new PatternBuilder(this.node, PatternBuilder.raw(source));
  }

  /**
   * Creates an alternation between this pattern and the given patterns.
   *
   * @param patterns - The additional alternatives.
   */
  or(...patterns: PatternInput[]): PatternBuilder {
    return new PatternBuilder(
      new AlternationNode([this.node, ...patterns.map(toNode)]),
    );
  }

  /** Returns a character set that excludes the current pattern. */
  negate(): PatternBuilder {
    const source = this.toString();
    return source.startsWith("[") && source.endsWith("]")
      ? PatternBuilder.raw(`[^${source.slice(1, -1)}]`)
      : PatternBuilder.raw(`[^${source}]`);
  }

  /**
   * Wraps the pattern in a group.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   * @param options - The group behavior.
   */
  group(
    callback:
      | ((factory: PatternFactory) => PatternBuilder)
      | undefined = undefined,
    options: {
      type?: GroupType;
    } = {},
  ): PatternBuilder {
    const factory: PatternFactory = (...inputs) =>
      new PatternBuilder(this.node, ...inputs);
    const child = callback ? callback(factory).node : this.node;
    return new PatternBuilder(
      new GroupNode(child, options.type ?? "capturing"),
    );
  }

  /**
   * Wraps the pattern in a non-capturing group.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  nonCapture(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.group(callback, { type: "non-capturing" });
  }

  /**
   * Alias for {@link PatternBuilder.nonCapture}.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  nonCapturingGroup(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.nonCapture(callback);
  }

  /**
   * Wraps the pattern in a positive lookahead.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  lookahead(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.group(callback, { type: "lookahead" });
  }

  /**
   * Wraps the pattern in a negative lookahead.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  negateLookahead(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.group(callback, { type: "negative-lookahead" });
  }

  /**
   * Wraps the pattern in a positive lookbehind.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  lookbehind(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.group(callback, { type: "lookbehind" });
  }

  /**
   * Wraps the pattern in a negative lookbehind.
   *
   * @param callback - Optionally appends inputs to this pattern before grouping.
   */
  negateLookbehind(
    callback?: ((factory: PatternFactory) => PatternBuilder) | undefined,
  ) {
    return this.group(callback, { type: "negative-lookbehind" });
  }

  /**
   * Anchors the pattern to the selected input boundary.
   *
   * @param position - The input boundary or boundaries to match. Defaults to both.
   */
  anchor(position: AnchorPosition = "both"): PatternBuilder {
    return new PatternBuilder(new AnchorNode(this.node, position));
  }

  /**
   * Applies a quantifier to the pattern.
   *
   * @param options - The repetition bounds and matching behavior.
   */
  quantify(options: QuantifierOptions): PatternBuilder {
    return new PatternBuilder(new QuantifierNode(this.node, options));
  }

  /** Requires one or more repetitions. */
  oneOrMore() {
    return this.quantify({ min: 1 });
  }

  /** Allows zero or more repetitions. */
  zeroOrMore() {
    return this.quantify({ min: 0 });
  }

  /**
   * Requires exactly the given number of repetitions.
   *
   * @param count - The required number of repetitions.
   */
  exact(count: number) {
    return this.quantify({ min: count, max: count });
  }

  /**
   * Requires at least `min` and, when supplied, at most `max` repetitions.
   *
   * @param min - The minimum number of repetitions.
   * @param max - The maximum number of repetitions, or no upper bound when omitted.
   */
  repeat(min: number, max?: number) {
    return this.quantify({ min, max });
  }

  /** Allows zero or one repetition. */
  optional() {
    return this.quantify({ min: 0, max: 1 });
  }

  /** Returns the generated regular expression source. */
  toString(): string {
    return this.node.toString();
  }

  /**
   * Compiles the pattern into a regular expression.
   *
   * @param flags - Native regular expression flags.
   * @throws An `Error` when the generated source or flags are invalid.
   */
  compile(...flags: PatternFlag[]): RegExp {
    const source = this.toString();
    const flag = flags.join("");

    try {
      return new RegExp(source, flag);
    } catch (error) {
      throw new Error(
        `Failed to create RegExp from "${source}" with flags "${flag}"`,
        { cause: error },
      );
    }
  }
}

/**
 * Creates a pattern builder from the given inputs.
 *
 * String inputs are escaped as literal text. Use `pattern.raw()` for raw
 * regular expression syntax.
 *
 * @param inputs - The values to concatenate in order.
 *
 * @example
 * ```ts
 * pattern("file.", digit.oneOrMore()).anchor().compile();
 * // /^file\.[0-9]+$/
 * ```
 */
export function pattern(...inputs: PatternInput[]): PatternBuilder {
  return new PatternBuilder(...inputs);
}

/** Convenience helpers for creating raw patterns and character sets. */
export namespace pattern {
  /** Creates a builder from an unescaped regular expression source. */
  export const raw = PatternBuilder.raw;
  /** Creates a character set from the given pattern inputs. */
  export const characterSet = PatternBuilder.characterSet;
}

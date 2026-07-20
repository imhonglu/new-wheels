import { AlternationNode } from "./alternation-node.js";
import { GroupNode } from "./group-node.js";
import { RawNode } from "./raw-node.js";
import { RegexNode } from "./regex-node.js";

/** Options that control how often a pattern may repeat. */
export interface QuantifierOptions {
  /** The minimum number of repetitions. */
  min: number;
  /** The maximum number of repetitions, or no upper bound when omitted. */
  max?: number;
  /** Whether to use lazy matching. */
  lazy?: boolean;
}

function formatQuantifier({
  min,
  max,
  lazy = false,
}: QuantifierOptions): string {
  const quantifier =
    max === undefined
      ? min === 0
        ? "*"
        : min === 1
          ? "+"
          : `{${min},}`
      : min === 0 && max === 1
        ? "?"
        : min === max
          ? `{${min}}`
          : `{${min},${max}}`;

  return `${quantifier}${lazy ? "?" : ""}`;
}

/**
 * An AST node that applies a quantifier to a pattern.
 *
 * Multi-character patterns are automatically wrapped in a non-capturing group.
 *
 * @example
 * ```ts
 * new QuantifierNode(new TextNode("ab"), { min: 1 }).toString();
 * // "(?:ab)+"
 * ```
 */
export class QuantifierNode extends RegexNode {
  /** Identifies this node as a quantifier. */
  readonly kind = "quantifier";

  /**
   * Creates a quantifier node.
   *
   * @param child - The pattern to repeat.
   * @param options - The repetition bounds and matching behavior.
   */
  constructor(
    public readonly child: RegexNode,
    public readonly options: QuantifierOptions,
  ) {
    super();
  }

  /** Returns the quantified regular expression source. */
  toString(): string {
    const source = this.child.toString();
    const child =
      (this.child instanceof RawNode &&
        (source.length === 1 || source.startsWith("["))) ||
      this.child instanceof GroupNode ||
      this.child instanceof AlternationNode
        ? source
        : `(?:${source})`;

    return `${child}${formatQuantifier(this.options)}`;
  }
}

import { RegexNode } from "./regex-node.js";

/**
 * An AST node that matches one of several alternative patterns.
 *
 * @example
 * ```ts
 * new AlternationNode([new TextNode("yes"), new TextNode("no")]).toString();
 * // "(?:yes|no)"
 * ```
 */
export class AlternationNode extends RegexNode {
  /** Identifies this node as an alternation. */
  readonly kind = "alternation";

  /**
   * Creates an alternation node.
   *
   * @param alternatives - The patterns from which one may match.
   */
  constructor(public readonly alternatives: readonly RegexNode[]) {
    super();
  }

  /** Returns the non-capturing alternation source. */
  toString(): string {
    return `(?:${this.alternatives.map(String).join("|")})`;
  }
}

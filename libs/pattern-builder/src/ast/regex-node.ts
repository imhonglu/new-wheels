/** The base class for regular expression AST nodes. */
export abstract class RegexNode {
  /** Identifies the concrete node type. */
  abstract readonly kind: string;

  /** Returns the regular expression source represented by this node. */
  abstract toString(): string;

  /**
   * Compiles this node into a regular expression.
   *
   * @param flags - Native regular expression flags.
   */
  toRegExp(flags = ""): RegExp {
    return new RegExp(this.toString(), flags);
  }
}

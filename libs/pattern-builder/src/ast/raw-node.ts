import { RegexNode } from "./regex-node.js";

/**
 * An AST node containing an unescaped regular expression source.
 *
 * @example
 * ```ts
 * new RawNode(/[a-z]+/i).toString(); // "[a-z]+"
 * ```
 */
export class RawNode extends RegexNode {
  /** Identifies this node as raw regular expression source. */
  readonly kind = "raw";

  /**
   * Creates a raw node.
   *
   * @param source - A source string or regular expression. RegExp flags are ignored.
   */
  constructor(public readonly source: string | RegExp) {
    super();
  }

  /** Returns the unescaped regular expression source. */
  toString(): string {
    return typeof this.source === "string" ? this.source : this.source.source;
  }
}

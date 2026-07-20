import { RegexNode } from "./regex-node.js";

/**
 * An AST node containing literal text with regular expression syntax escaped.
 *
 * @example
 * ```ts
 * new TextNode("a.b").toString(); // "a\\.b"
 * ```
 */
export class TextNode extends RegexNode {
  /** Identifies this node as literal text. */
  readonly kind = "text";

  /**
   * Creates a text node.
   *
   * @param value - The literal text to match.
   */
  constructor(public readonly value: string) {
    super();
  }

  /** Returns the escaped regular expression source. */
  toString(): string {
    return this.value.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&");
  }
}

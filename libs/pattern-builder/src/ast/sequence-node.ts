import { RegexNode } from "./regex-node.js";

/**
 * An AST node that concatenates patterns in order.
 *
 * @example
 * ```ts
 * new SequenceNode([new TextNode("a"), new RawNode("[0-9]")]).toString();
 * // "a[0-9]"
 * ```
 */
export class SequenceNode extends RegexNode {
  /** Identifies this node as a sequence. */
  readonly kind = "sequence";

  /**
   * Creates a sequence node and copies the supplied children.
   *
   * @param children - The patterns to concatenate.
   */
  constructor(public readonly children: readonly RegexNode[]) {
    super();
    this.children = [...children];
  }

  /** Returns the concatenated regular expression source. */
  toString(): string {
    return this.children.map(String).join("");
  }
}

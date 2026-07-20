import { RegexNode } from "./regex-node.js";

/** The positions at which a pattern can be anchored. */
export type AnchorPosition = "start" | "end" | "both";

/**
 * An AST node that anchors a pattern to the start, end, or both ends of input.
 *
 * @example
 * ```ts
 * new AnchorNode(new TextNode("foo"), "both").toString(); // "^foo$"
 * ```
 */
export class AnchorNode extends RegexNode {
  /** Identifies this node as an anchor. */
  readonly kind = "anchor";

  /**
   * Creates an anchor node.
   *
   * @param child - The pattern to anchor.
   * @param position - The input boundary or boundaries to match.
   */
  constructor(
    public readonly child: RegexNode,
    public readonly position: AnchorPosition,
  ) {
    super();
  }

  /** Returns the anchored regular expression source. */
  toString(): string {
    return this.position === "both"
      ? `^${this.child}$`
      : this.position === "start"
        ? `^${this.child}`
        : `${this.child}$`;
  }
}

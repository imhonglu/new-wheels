import { RegexNode } from "./regex-node.js";

/** The supported regular expression group types. */
export type GroupType =
  | "capturing"
  | "non-capturing"
  | "lookahead"
  | "negative-lookahead"
  | "lookbehind"
  | "negative-lookbehind";

const PREFIX: Record<GroupType, string> = {
  capturing: "(",
  "non-capturing": "(?:",
  lookahead: "(?=",
  "negative-lookahead": "(?!",
  lookbehind: "(?<=",
  "negative-lookbehind": "(?<!",
};

/**
 * An AST node that wraps a pattern in a regular expression group.
 *
 * @example
 * ```ts
 * new GroupNode(new TextNode("foo"), "non-capturing").toString();
 * // "(?:foo)"
 * ```
 */
export class GroupNode extends RegexNode {
  /** Identifies this node as a group. */
  readonly kind = "group";

  /**
   * Creates a group node.
   *
   * @param child - The pattern to wrap.
   * @param type - The group behavior. Defaults to a capturing group.
   */
  constructor(
    public readonly child: RegexNode,
    public readonly type: GroupType = "capturing",
  ) {
    super();
  }

  /** Returns the grouped regular expression source. */
  toString(): string {
    return `${PREFIX[this.type]}${this.child})`;
  }
}

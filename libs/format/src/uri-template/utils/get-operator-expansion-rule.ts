import type { Operator } from "../types/operator.js";

export interface OperatorExpansionRule {
	first: string;
	sep: string;
	named: boolean;
	ifemp: string;
	allow: "U" | "U+R";
}

/**
 * .------------------------------------------------------------------.
 * |          NUL     +      .       /       ;      ?      &      #   |
 * |------------------------------------------------------------------|
 * | first |  ""     ""     "."     "/"     ";"    "?"    "&"    "#"  |
 * | sep   |  ","    ","    "."     "/"     ";"    "&"    "&"    ","  |
 * | named | false  false  false   false   true   true   true   false |
 * | ifemp |  ""     ""     ""      ""      ""     "="    "="    ""   |
 * | allow |   U     U+R     U       U       U      U      U     U+R  |
 * `------------------------------------------------------------------'
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6570#page-30 | RFC 6570#page-30}
 */
const OPERATOR_EXPANSION_RULES: Record<string, OperatorExpansionRule> = {
	"+": {
		first: "",
		sep: ",",
		named: false,
		ifemp: "",
		allow: "U+R",
	},
	".": {
		first: ".",
		sep: ".",
		named: false,
		ifemp: "",
		allow: "U",
	},
	"/": {
		first: "/",
		sep: "/",
		named: false,
		ifemp: "",
		allow: "U",
	},
	";": {
		first: ";",
		sep: ";",
		named: true,
		ifemp: "=",
		allow: "U",
	},
	"?": {
		first: "?",
		sep: "&",
		named: true,
		ifemp: "=",
		allow: "U",
	},
	"&": {
		first: "&",
		sep: "&",
		named: true,
		ifemp: "=",
		allow: "U",
	},
	"#": {
		first: "#",
		sep: ",",
		named: false,
		ifemp: "",
		allow: "U+R",
	},
};

const DEFAULT_RULE: OperatorExpansionRule = {
	first: "",
	sep: ",",
	named: false,
	ifemp: "",
	allow: "U",
};

export function getOperatorExpansionRule(
	operator?: Operator,
): OperatorExpansionRule {
	if (!operator) {
		return DEFAULT_RULE;
	}

	return operator in OPERATOR_EXPANSION_RULES
		? OPERATOR_EXPANSION_RULES[operator]
		: DEFAULT_RULE;
}

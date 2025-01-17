import type { PatternFlag } from "../types/pattern-flag.js";

export class PatternBuilder {
  constructor(public source: string) {}

  anchor(position?: "start" | "end"): PatternBuilder {
    switch (position) {
      case "start":
        this.source = `^${this.source}`;
        break;
      case "end":
        this.source = `${this.source}$`;
        break;
      default:
        this.source = `^${this.source}$`;
        break;
    }

    return this;
  }

  group() {
    this.source = `(${this.source})`;
    return this;
  }

  nonCapturingGroup() {
    this.source = `(?:${this.source})`;
    return this;
  }

  lookahead() {
    this.source = `(?=${this.source})`;
    return this;
  }

  negateLookahead() {
    this.source = `(?!${this.source})`;
    return this;
  }

  lookbehind() {
    this.source = `(?<=${this.source})`;
    return this;
  }

  negateLookbehind() {
    this.source = `(?<!${this.source})`;
    return this;
  }

  // quantifier
  oneOrMore() {
    this.source = `${this.source}+`;
    return this;
  }
  zeroOrMore() {
    this.source = `${this.source}*`;
    return this;
  }
  exact(count: number) {
    this.source = `${this.source}{${count}}`;
    return this;
  }
  repeat(min: number, max?: number) {
    this.source = `${this.source}{${min},${max ?? ""}}`;
    return this;
  }
  optional() {
    this.source = `${this.source}?`;
    return this;
  }

  clone() {
    return new PatternBuilder(this.source);
  }
  toString() {
    return this.source;
  }

  toRegExp(...flags: PatternFlag[]) {
    return new RegExp(this.toString(), flags.join(""));
  }
}

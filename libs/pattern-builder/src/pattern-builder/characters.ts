import { PatternBuilder } from "./pattern-builder.js";

export class Characters extends PatternBuilder {
  negate() {
    this.source = `[^${this.source.slice(1, -1)}]`;
    return this;
  }

  clone() {
    return new Characters(this.source);
  }
}

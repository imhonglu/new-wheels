import { expectTypeOf, it } from "vitest";
import type { Escape } from "./escape.js";

it("should escape special characters in strings", () => {
  expectTypeOf<Escape<"a/b">>().toEqualTypeOf<"a~1b">();
  expectTypeOf<Escape<"a~b">>().toEqualTypeOf<"a~0b">();
  expectTypeOf<Escape<"normal">>().toEqualTypeOf<"normal">();

  expectTypeOf<Escape<"a/b~c">>().toEqualTypeOf<"a~1b~0c">();
  expectTypeOf<Escape<"~/test">>().toEqualTypeOf<"~0~1test">();
  expectTypeOf<Escape<"/~test">>().toEqualTypeOf<"~1~0test">();
  expectTypeOf<Escape<"a/b~c/d">>().toEqualTypeOf<"a~1b~0c~1d">();

  expectTypeOf<Escape<"~~~">>().toEqualTypeOf<"~0~0~0">();
  expectTypeOf<Escape<"///">>().toEqualTypeOf<"~1~1~1">();
  expectTypeOf<Escape<"~/~/~">>().toEqualTypeOf<"~0~1~0~1~0">();

  expectTypeOf<Escape<"">>().toEqualTypeOf<"">();
  expectTypeOf<Escape<"~">>().toEqualTypeOf<"~0">();
  expectTypeOf<Escape<"/">>().toEqualTypeOf<"~1">();

  expectTypeOf<Escape<"~start">>().toEqualTypeOf<"~0start">();
  expectTypeOf<Escape<"end~">>().toEqualTypeOf<"end~0">();
  expectTypeOf<Escape<"/start">>().toEqualTypeOf<"~1start">();
  expectTypeOf<Escape<"end/">>().toEqualTypeOf<"end~1">();

  expectTypeOf<Escape<"path/to~item">>().toEqualTypeOf<"path~1to~0item">();
  expectTypeOf<
    Escape<"~start/middle~end">
  >().toEqualTypeOf<"~0start~1middle~0end">();
});

it("should maintain data integrity in bidirectional conversion", () => {
  type SimpleCase = "a/b";
  type ComplexCase = "path/to~item/with/multiple~special/chars";
  type EdgeCase = "~/~/~";

  type SimpleEscaped = Escape<SimpleCase>;
  type ComplexEscaped = Escape<ComplexCase>;
  type EdgeEscaped = Escape<EdgeCase>;

  expectTypeOf<SimpleEscaped>().toEqualTypeOf<"a~1b">();
  expectTypeOf<ComplexEscaped>().toEqualTypeOf<"path~1to~0item~1with~1multiple~0special~1chars">();
  expectTypeOf<EdgeEscaped>().toEqualTypeOf<"~0~1~0~1~0">();
});

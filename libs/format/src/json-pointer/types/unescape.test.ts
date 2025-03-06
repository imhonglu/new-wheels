import { expectTypeOf, it } from "vitest";
import type { Unescape } from "./unescape.js";

it("should unescape JSON Pointer sequences", () => {
  expectTypeOf<Unescape<"a~1b">>().toEqualTypeOf<"a/b">();
  expectTypeOf<Unescape<"a~0b">>().toEqualTypeOf<"a~b">();
  expectTypeOf<Unescape<"normal">>().toEqualTypeOf<"normal">();

  expectTypeOf<Unescape<"a~1b~0c">>().toEqualTypeOf<"a/b~c">();
  expectTypeOf<Unescape<"~0~1test">>().toEqualTypeOf<"~/test">();
  expectTypeOf<Unescape<"~1~0test">>().toEqualTypeOf<"/~test">();
  expectTypeOf<Unescape<"a~1b~0c~1d">>().toEqualTypeOf<"a/b~c/d">();

  expectTypeOf<Unescape<"~0~0~0">>().toEqualTypeOf<"~~~">();
  expectTypeOf<Unescape<"~1~1~1">>().toEqualTypeOf<"///">();
  expectTypeOf<Unescape<"~0~1~0~1~0">>().toEqualTypeOf<"~/~/~">();

  expectTypeOf<Unescape<"">>().toEqualTypeOf<"">();
  expectTypeOf<Unescape<"~0">>().toEqualTypeOf<"~">();
  expectTypeOf<Unescape<"~1">>().toEqualTypeOf<"/">();

  expectTypeOf<Unescape<"~">>().toEqualTypeOf<"~">();
  expectTypeOf<Unescape<"test~">>().toEqualTypeOf<"test~">();

  expectTypeOf<Unescape<"path~1to~0item">>().toEqualTypeOf<"path/to~item">();
  expectTypeOf<
    Unescape<"~0start~1middle~0end">
  >().toEqualTypeOf<"~start/middle~end">();
});

import type { Escape } from "./escape.js";

/**
 * Generates all possible JSON Pointer paths for an object
 *
 * @example
 * interface Example {
 *   items: Array<{ id: string }>;
 *   meta: { count: number };
 * }
 *
 * type Paths = PointerPaths<Example>;
 * // "" | "/items" | `/items/${number}` | `/items/${number}/id` | "/meta" | "/meta/count"
 */
export type PointerPaths<T> = T extends Array<infer U>
  ? "" | `/${number}` | `/${number}${PointerPaths<U>}`
  : T extends object
    ?
        | ""
        | {
            [K in keyof T]: K extends string
              ? `/${Escape<K>}${PointerPaths<T[K]>}`
              : never;
          }[keyof T]
    : "";

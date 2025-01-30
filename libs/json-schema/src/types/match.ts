export type Match<T, Matcher> = T extends readonly [infer First, ...infer Rest]
  ? First extends keyof Matcher
    ? Matcher[First] | Match<Rest, Matcher>
    : never
  : T extends keyof Matcher
    ? Matcher[T]
    : never;

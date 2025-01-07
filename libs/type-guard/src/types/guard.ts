export type Guard<T = unknown> = (value: unknown) => value is T;

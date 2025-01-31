export type Optional<T, K> = K extends keyof T
  ? Omit<T, K> & {
      [P in K]?: T[P];
    }
  : never;

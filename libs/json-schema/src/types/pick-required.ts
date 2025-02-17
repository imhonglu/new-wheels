export type PickRequired<T> = Exclude<
  {
    [P in keyof T]: undefined extends T[P] ? never : P;
  }[keyof T],
  undefined
>;

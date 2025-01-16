export type ValidationContext = Map<string | number, boolean>;

export type ValidationFunction = (
  data: unknown,
  context: ValidationContext,
) => boolean;

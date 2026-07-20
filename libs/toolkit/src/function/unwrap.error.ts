import type { unwrap } from "./unwrap.js";

/** An error thrown by {@link unwrap} when a value is null or undefined. */
export class UnwrapError extends Error {
  public constructor(
    message = "Cannot unwrap null or undefined value",
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "UnwrapError";
  }
}

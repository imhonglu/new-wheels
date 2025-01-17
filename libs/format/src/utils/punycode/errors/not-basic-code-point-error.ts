export class NotBasicCodePointError extends RangeError {
  constructor(options?: ErrorOptions) {
    super("Illegal input >= 0x80 (not a basic code point)", options);
  }
}

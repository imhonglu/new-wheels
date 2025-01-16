export class InvalidFormatError extends Error {
	constructor(data: unknown, options?: ErrorOptions) {
		super(`Invalid format: ${data}`, options);
	}
}

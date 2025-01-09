export class InvalidUUIDError extends Error {
	constructor(string: string, options?: ErrorOptions) {
		super(`Invalid UUID: ${string}`, options);
	}
}

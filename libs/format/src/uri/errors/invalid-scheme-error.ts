export class InvalidSchemeError extends Error {
	constructor(scheme: string, options?: ErrorOptions) {
		super(`Invalid scheme: ${scheme}`, options);
	}
}

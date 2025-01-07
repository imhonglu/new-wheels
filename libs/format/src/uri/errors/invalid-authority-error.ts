export class InvalidAuthorityError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid authority: expected valid authority, but received '${text}'`,
			options,
		);
	}
}

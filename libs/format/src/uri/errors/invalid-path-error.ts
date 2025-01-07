export class InvalidPathError extends Error {
	constructor(text: string, options?: ErrorOptions) {
		super(
			`Invalid Path: expected valid path segments, but received '${text}'`,
			options,
		);
	}
}

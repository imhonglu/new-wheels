export class InvalidJsonPointerError extends Error {
	constructor(text: string) {
		super(`Invalid JSON pointer: ${text}`);
	}
}

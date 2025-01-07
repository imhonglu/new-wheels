export class InvalidFragmentError extends Error {
	constructor(fragment: string) {
		super(`Invalid fragment: ${fragment}`);
		this.name = "InvalidFragmentError";
	}
}

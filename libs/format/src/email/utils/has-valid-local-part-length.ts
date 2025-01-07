export function hasValidLocalPartLength(text: string) {
	return text.length <= 64 && text.length >= 1;
}

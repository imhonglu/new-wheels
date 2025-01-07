export function hasValidDomainLength(text: string) {
	return text.length <= 255 && text.length >= 1;
}

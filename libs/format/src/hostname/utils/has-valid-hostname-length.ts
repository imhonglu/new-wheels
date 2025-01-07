export function hasValidHostnameLength(hostname: string): boolean {
	return hostname.length >= 1 && hostname.length <= 255;
}

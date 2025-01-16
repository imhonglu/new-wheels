export function hasValidMailboxLength(text: string) {
  return text.length <= 320 && text.length >= 3;
}

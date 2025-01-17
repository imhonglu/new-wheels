import { is } from "./is.js";

export function tryParseJson(data: unknown) {
  try {
    if (is.string(data)) {
      return JSON.parse(data);
    }

    return data;
  } catch {
    return data;
  }
}

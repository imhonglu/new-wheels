const pattern = /[A-Z\W_][a-z]/g;

function isAlphabet(character: string) {
  const charCode = character.charCodeAt(0);
  return charCode >= 65 && charCode <= 90;
}

function convert(string: string, defaultSeparator: string) {
  return string.replace(pattern, ([separator, letter]) => {
    let result = defaultSeparator;

    if (isAlphabet(separator)) {
      if (string.indexOf(separator) === 0) {
        result = separator;
      } else {
        result += separator;
      }
    }

    result += letter;

    return result.toLowerCase();
  });
}

/**
 * Converts a string to kebab case.
 *
 * @param string - The string to convert
 * @returns The kebab case string
 *
 * @example
 * ```ts
 * kebabCase("fooBar") // "foo-bar"
 * ```
 */
export function kebabCase(string: string) {
  return convert(string, "-");
}

/**
 * Converts a string to snake case.
 *
 * @param string - The string to convert
 * @returns The snake case string
 *
 * @example
 * ```ts
 * snakeCase("fooBar") // "foo_bar"
 * ```
 */
export function snakeCase(string: string) {
  return convert(string, "_");
}

/**
 * Converts a string to camel case.
 *
 * @param string - The string to convert
 * @returns The camel case string
 *
 * @example
 * ```ts
 * camelCase("foo-bar") // "fooBar"
 * ```
 */
export function camelCase(string: string) {
  return kebabCase(string).replace(/-[\w]/g, ([, letter]) =>
    letter.toUpperCase(),
  );
}

/**
 * Converts a string to pascal case.
 *
 * @param string - The string to convert
 * @returns The pascal case string
 *
 * @example
 * ```ts
 * pascalCase("foo-bar") // "FooBar"
 * ```
 */
export function pascalCase(string: string) {
  return camelCase(string).replace(/^[\w]/, (firstLetter) =>
    firstLetter.toUpperCase(),
  );
}

/**
 * Converts a string to camel case, kebab case, snake case, or pascal case.
 *
 * @param string - The string to convert
 * @returns The converted string
 *
 * @example
 * ```ts
 * stringCase.toCamel("foo-bar") // "fooBar"
 * ```
 */
export const stringCase = {
  toCamel: camelCase,
  toKebab: kebabCase,
  toSnake: snakeCase,
  toPascal: pascalCase,
};

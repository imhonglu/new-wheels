const pattern = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

export interface URIComponents {
  scheme?: string;
  authority?: string;
  path?: string;
  query?: string;
  fragment?: string;
}

/**
 * Parses a URI/IRI string into its components.
 *
 * @param text - A URI/IRI string.
 * @returns An object containing the URI components.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986#appendix-B | RFC 3986#appendix-B}
 *
 */
export function parseURIComponents(text: string): URIComponents | undefined {
  const match = text.match(pattern);

  if (!match) {
    return undefined;
  }

  /**
   * scheme    = $2
   * authority = $4
   * path      = $5
   * query     = $7
   * fragment  = $9
   */
  const [, , scheme, , authority, path, , query, , fragment] = match;

  return {
    scheme,
    authority,
    path,
    query,
    fragment,
  };
}

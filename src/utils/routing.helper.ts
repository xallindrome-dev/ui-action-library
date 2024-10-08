/**
 * @module Utils
 * @category Routing Helpers
 */

import type { KeyValuePair } from "../types";

/**
 * Converts an object of key-value pairs into a URL query string.
 * The keys and values are URI encoded to ensure special characters are handled correctly.
 *
 * @param params - An object containing key-value pairs to be converted into a query string.
 *   - Keys are strings that represent parameter names.
 *   - Values are strings or values that will be converted to strings, representing parameter values.
 *
 * @returns A string that represents the URL query string.
 *   - Begins with a "?" followed by key-value pairs in the form of `key=value`, joined by "&".
 *   - If `params` is empty, returns just "?".
 *
 * @example
 * ```typescript
 * const params = { name: 'John Doe', age: '30' };
 * const queryString = convertToQueryString(params);
 * // Returns: "?name=John%20Doe&age=30"
 * ```
 */
export const convertToQueryString = (params: KeyValuePair): string => {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return "?" + queryString;
};

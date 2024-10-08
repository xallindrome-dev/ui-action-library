/**
 * @module Utils
 * @category Cache Helpers
 */

import type { CacheData } from "../types";

/**
 * Generates a unique cache key by concatenating the query name with the stringified query parameters.
 *
 * @param queryName - The name of the query or identifier for the request.
 * @param stringifiedQuery - The query parameters as a string (typically from JSON.stringify).
 *
 * @returns A string representing a unique cache key for storing and retrieving data from the cache.
 *
 * @example
 * ```typescript
 * const cacheKey = generateCacheKey("getUser", '{"id":1}');
 * // Returns: "getUser{"id":1}"
 * ```
 */
export const generateCacheKey = (
  queryName: string,
  stringifiedQuery: string
): string => queryName + stringifiedQuery;

/**
 * Retrieves data from localStorage cache if available and not expired.
 * Checks the cache for a specific query, and if the cached data is not expired, returns it.
 * If expired, removes it from the cache and returns null.
 *
 * @param queryName - The name of the query or identifier for the request.
 * @param query - The query parameters used for generating the cache key.
 * @param expirationMinutes - (Optional) The expiration time in minutes after which the cache is considered invalid (default is 2 minutes).
 *
 * @returns The cached data if present and not expired, otherwise null.
 *
 * @example
 * ```typescript
 * const data = pullFromCache("getUser", { id: 1 }, 5);
 * // Returns cached data if it exists and is not expired, otherwise returns null.
 * ```
 */
export const pullFromCache = (
  queryName: string,
  query: any,
  expirationMinutes = 2
): any | null => {
  try {
    const cacheKey = generateCacheKey(queryName, JSON.stringify(query));
    const cachedResponse = JSON.parse(
      (localStorage.getItem(cacheKey) as any) || "{}"
    );

    // If exists in cache
    if (cachedResponse.data && cachedResponse.timestamp) {
      const { data, timestamp }: CacheData = cachedResponse;

      // If expired, remove from cache and return null
      if (Date.now() - timestamp > expirationMinutes * 60 * 1000) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      // In cache and not expired, return data
      return data;
    }

    // Not in cache, return null
    return null;
  } catch (error: any) {
    console.error(
      "An error occurred while pulling from cache",
      queryName,
      query,
      expirationMinutes,
      error
    );
    return null;
  }
};

/**
 * Stores data in the localStorage cache with a timestamp.
 * Saves the data along with the current timestamp so it can be checked for expiration when retrieved.
 *
 * @param queryName - The name of the query or identifier for the request.
 * @param query - The query parameters used for generating the cache key.
 * @param data - The data to be cached.
 * @param expirationMinutes - (Optional) The expiration time in minutes after which the cache will expire (default is 2 minutes).
 *
 * @returns void
 *
 * @example
 * ```typescript
 * writeToCache("getUser", { id: 1 }, { name: "John" }, 5);
 * // Caches the data for 5 minutes
 * ```
 */
export const writeToCache = (
  queryName: string,
  query: any,
  data: any,
  expirationMinutes = 2
): void => {
  try {
    const cacheKey = generateCacheKey(queryName, JSON.stringify(query));
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: Date.now() + expirationMinutes * 60 * 1000,
      })
    );
  } catch (err) {
    console.error(
      "An error occurred while writing to cache",
      queryName,
      query,
      data,
      expirationMinutes,
      err
    );
  }
};

/**
 * Retrieves a deep value from an object using a dot-separated key path.
 *
 * @param object - The object from which to retrieve the value.
 * @param key - A dot-separated string representing the path to the desired value in the object.
 *  - For example, 'a.b.c' would retrieve `object.a.b.c`.
 *
 * @returns The value located at the specified key path within the object, or `undefined` if the key does not exist.
 *
 * @typeParam T - The type of the object being searched.
 * @typeParam K - The type of the key string (dot-separated).
 */
export const getObjDeepValue = <T extends object, K extends string>(
  object: T,
  key: K
): T =>
  key
    ? key.split(".").reduce((r, k) => (r ? (r as any)[k] : r), object)
    : object;

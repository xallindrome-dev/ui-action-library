import type { KeyObjectDef } from "../types";

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

/**
 * Groups an array of objects by a specified key.
 * Returns an object where each key is a unique value from the specified property,
 * and each corresponding value is an array of objects with that property value.
 *
 * @param list - An array of objects to be grouped.
 *   - Each object should contain the specified key property.
 * @param key - The property name by which to group the objects.
 *
 * @returns An object where keys are the unique values of the specified property,
 *   and values are arrays of objects that have the same value for that property.
 *
 * @example
 * ```typescript
 * const list = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupValues(list, 'category');
 * // Returns:
 * // {
 * //   fruit: [{ category: 'fruit', name: 'apple' }, { category: 'fruit', name: 'banana' }],
 * //   vegetable: [{ category: 'vegetable', name: 'carrot' }]
 * // }
 * ```
 */
export const groupValues = (list: KeyObjectDef[], key: string) =>
  list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );

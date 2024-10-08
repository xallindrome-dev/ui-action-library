/**
 * @module Utils
 * @category Array Helpers
 */

import type { Value } from "../models";
import type { KeyValuePair } from "../types";

/**
 * Updates an item within an array based on a matching `id` property.
 * If an item with the same `id` as the payload is found, it will be merged with the payload.
 * Returns a new array with the updated item.
 *
 * @template T - The type of the items in the array.
 * @template Y - The type of the payload, which should contain an `id` property.
 *
 * @param array - The array containing items to be updated.
 * @param payload - The item with updated properties, identified by its `id`.
 * @returns A new array with the updated item. If the `id` is not found, returns the original array.
 *
 * @example
 * ```typescript
 * const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const updatedItems = updateItemInArray(items, { id: 1, name: 'Updated Item 1' });
 * // Returns: [{ id: 1, name: 'Updated Item 1' }, { id: 2, name: 'Item 2' }]
 * ```
 */
export const updateItemInArray = <
  T extends { id?: unknown },
  Y extends { id?: unknown },
>(
  array: T[],
  payload: Y
): T[] => {
  const { id } = payload;
  return array.map((item: T) =>
    item.id === id ? { ...item, ...payload } : item
  );
};

/**
 * Removes an item from an array based on its `id` property.
 * Returns a new array with the specified item removed.
 *
 * @template T - The type of the items in the array.
 *
 * @param array - The array from which the item will be removed.
 * @param value - The `value` of the item to remove from the array.
 * @param key - The `key` of the item to remove from the array.
 * @returns A new array with the specified item removed.
 *
 * @example
 * ```typescript
 * const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const updatedItems = removeItemInArray(items, 1);
 * // Returns: [{ id: 2, name: 'Item 2' }]
 * ```
 */
export const removeItemInArray = <T extends KeyValuePair>(
  array: T[],
  value: Value,
  key: string
): T[] => {
  return array.filter((item: T) => item[key] !== value);
};

/**
 * Returns a new array containing unique items, based on a specified property.
 * Keeps only the first occurrence of each unique property value.
 *
 * @template T - The type of the items in the array.
 *
 * @param arr - The array from which duplicate items will be removed.
 * @param prop - The property to use for determining uniqueness.
 * @returns A new array containing only unique items by the specified property.
 *
 * @example
 * ```typescript
 * const items = [
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' },
 *   { id: 3, name: 'Item 1' }
 * ];
 * const uniqueItems = uniqueBy(items, 'name');
 * // Returns: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]
 * ```
 */
export const uniqueBy = <T extends { [key: string]: any }>(
  arr: T[],
  prop: string
): T[] => {
  return arr.filter((a, i) => arr.findIndex((s) => a[prop] === s[prop]) === i);
};

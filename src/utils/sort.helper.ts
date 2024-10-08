/**
 * @module Utils
 * @category Sort Helpers
 */

/**
 * Sorts two strings in alphanumeric ascending order, considering special characters,
 * numbers, and letters. The sorting prioritizes special characters, then numbers, and
 * finally letters, all in ascending lexicographic order.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 *
 * @returns A negative number if `a` should appear before `b`, a positive number if `a`
 * should appear after `b`, or 0 if they are equal.
 */
export const alphanumericAscendingSort = (a: string, b: string): number => {
  const textA = a.toLowerCase();
  const textB = b.toLowerCase();

  // Helper function to classify the input
  const getTypePriority = (text: string): number => {
    if (/^[^a-zA-Z0-9]/.test(text)) return 0; // Special characters
    if (/^[0-9]/.test(text)) return 1; // Numbers
    if (/^[a-zA-Z]/.test(text)) return 2; // Letters
    return 3; // Default priority (shouldn't occur)
  };

  const priorityA = getTypePriority(textA);
  const priorityB = getTypePriority(textB);

  // Sort based on type priority first
  if (priorityA !== priorityB) return priorityA - priorityB;

  // If same type, sort lexicographically
  return textA.localeCompare(textB);
};

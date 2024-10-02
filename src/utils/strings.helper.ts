import type { Value } from "../models/Object";

/**
 * Checks if a value is null, undefined, or an empty string.
 *
 * @param value - The value to be checked.
 *  - Can be of any type (string, number, object, etc.).
 *
 * @returns `true` if the value is null, undefined, or an empty string, otherwise `false`.
 */
export const isNullEmptyOrUndefined = (value?: Value): boolean => {
  return value === null || value === undefined || value === "";
};

/**
 * Converts a string to title case, where the first letter of each word is capitalized
 * and the rest of the letters are lowercased.
 *
 * @param value - The input string to be converted to title case.
 *
 * @returns The converted string in title case, or an empty string if the input is undefined or null.
 */
export const toTitleCase = (value?: string | null): string => {
  if (!value) return "";

  return value.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

/**
 * Extracts the first letter of the first and second word from a person's name.
 * If there is only one word, it returns the first letter of that word.
 *
 * @param name - The name to extract initials from.
 *
 * @returns A string containing the first letter of the first and second word (if available),
 * or just the first letter of the first word, capitalized. Returns an empty string if input is invalid.
 */
export const nameToTwoLetters = (name?: string | null) => {
  if (!name) return name;

  const names = name
    .trim()
    .split(" ")
    .filter((c) => c);

  if (names.length < 1 || !names[0]) return "";

  if (names.length < 2 || !names[1]) return names[0][0].toUpperCase();

  return `${names[0][0].toUpperCase()}${names[1][0].toUpperCase()}`;
};

/**
 * Strips query parameters from a URL, returning only the base URL.
 *
 * @param link - The URL to be stripped.
 *
 * @returns The base URL without any query parameters.
 */
export const stripLink = (link: string) =>
  link.indexOf("?") > -1 ? link.split("?")[0] : link;

/**
 * Duplicates a string by adding an incremented number in parentheses at the end.
 * If the string already ends with a number in parentheses (e.g., "(2)"), it increments that number.
 *
 * @param input - The input string to be duplicated.
 *
 * @returns The duplicated string with an incremented number in parentheses.
 *  - If no number exists, adds "(2)" to the end of the string.
 */
export const duplicateStringValue = (input?: string | null): string => {
  if (!input) return "";

  // Match the pattern '(#)' at the end of the string
  const regex = /\((\d+)\)$/;
  const match = input.match(regex);

  if (match) {
    // If '(#)' is found, increment the number and replace it in the string
    const number = parseInt(match[1], 10) + 1;
    const updatedString = input.replace(regex, `(${number})`);
    return updatedString;
  } else {
    // If '(#)' is not found, add '(2)' to the end of the string
    return `${input} (2)`;
  }
};

/**
 * Finds all unique special characters in a string.
 * Special characters include: `#%&?$=<>/\+[]{}|^~\``.
 *
 * @param str - The input string to search for special characters.
 *
 * @returns An array of unique special characters found in the input string.
 */
export const findSpecialChars = (str: string): string[] => {
  const specialCharsRegex = /[#%&?$=<>/\\+\[\]{}|^~`]/g;
  const matches = str.match(specialCharsRegex);
  return matches ? Array.from(new Set(matches)) : []; // Remove duplicates
};

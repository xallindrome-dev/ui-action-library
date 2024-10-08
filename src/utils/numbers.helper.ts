/**
 * @module Utils
 * @category Numbers Helpers
 */

import { isNullEmptyOrUndefined } from "./strings.helper";

const defaultOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/**
 * Formats a number or string into a currency or number format based on the provided
 * or default `Intl.NumberFormatOptions`. It defaults to formatting as USD currency.
 *
 * @param value - The value to be formatted, can be a number or a string.
 *  - If a string is passed, it will attempt to convert it to a number.
 * @param options - (Optional) Formatting options as per `Intl.NumberFormatOptions`.
 *  - Defaults to a currency format with USD, minimum 2, and maximum 2 fraction digits.
 *
 * @returns A formatted string based on the provided value and formatting options.
 *  - Returns an empty string if the value is null, empty, undefined, or not a valid number.
 */
export const numberFormatify = (
  value: number | string,
  options = defaultOptions
): string => {
  if (isNullEmptyOrUndefined(value)) {
    return "";
  }
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return "";
  }
  return new Intl.NumberFormat("en-US", options).format(value);
};

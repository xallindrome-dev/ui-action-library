import type { InputOptions } from "../models/Input";

/**
 * Handles the input change for number fields by removing any non-numeric characters
 * and ensuring the input adheres to the specified min, max, and maxLength constraints.
 *
 * @param value - The current value of the input field as a string.
 * @param options - An object containing optional constraints for the input:
 *  - `max` (optional): The maximum allowed numeric value. Defaults to Number.MAX_SAFE_INTEGER.
 *  - `min` (optional): The minimum allowed numeric value. Defaults to Number.MIN_SAFE_INTEGER.
 *  - `maxLength` (optional): The maximum length of the input string. Defaults to Infinity.
 *
 * @returns A valid number string, or an empty string if the input is invalid or does not meet the constraints.
 */
export const handleNumberInputChange = (
  value: string,
  options: InputOptions
): string => {
  const {
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    maxLength = Infinity,
  } = options;
  let input = value.replace(/[^0-9]/g, "");

  if (input !== "" && /^\d+$/.test(input)) {
    const number = parseInt(input, 10);
    if (number <= max && number >= min && input.length <= maxLength) {
      return input;
    } else if (number < min) {
      return min.toString();
    }
  }
  return "";
};

/**
 * Handles the input change for decimal number fields by removing any invalid characters
 * and ensuring the input follows the specified min, max, and maxLength constraints.
 * Supports one decimal point and validates the number format.
 *
 * @param value - The current value of the input field as a string.
 * @param options - An object containing optional constraints for the input:
 *  - `max` (optional): The maximum allowed numeric value. Defaults to Number.MAX_SAFE_INTEGER.
 *  - `min` (optional): The minimum allowed numeric value. Defaults to Number.MIN_SAFE_INTEGER.
 *  - `maxLength` (optional): The maximum length of the input string. Defaults to Infinity.
 *
 * @returns A valid decimal string, or an empty string if the input is invalid or does not meet the constraints.
 * Note: This function currently doesn't handle the case where the input has multiple decimal points.
 */
export const handleDecimalInputChange = (
  value: string,
  options: InputOptions
): string => {
  const {
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    maxLength = Infinity,
  } = options;
  let input = value.replace(/[^\d.]/g, "");

  const validInputPattern = /^(\d+(\d{3})*(\.\d{1})?)?$/;
  const inputLength = input.length;
  const hasOneDecimal = input.split(".").length - 1 === 1;

  if (input === "") {
    return "";
  } else if (
    validInputPattern.test(input) ||
    (input.lastIndexOf(".") === inputLength - 1 && hasOneDecimal)
  ) {
    const number = parseFloat(input);
    if (
      !isNaN(number) &&
      number >= min &&
      number <= max &&
      inputLength <= maxLength
    ) {
      return input;
    }
  }
  return "";
};

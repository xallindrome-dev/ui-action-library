// utils.test.ts

import { describe, expect, it } from "vitest";
import {
  duplicateStringValue,
  findSpecialChars,
  isNullEmptyOrUndefined,
  nameToTwoLetters,
  stripLink,
  toTitleCase,
} from "../strings.helper";

describe("isNullEmptyOrUndefined", () => {
  it("should return true for null, undefined, or empty string", () => {
    expect(isNullEmptyOrUndefined(null)).toBe(true);
    expect(isNullEmptyOrUndefined(undefined)).toBe(true);
    expect(isNullEmptyOrUndefined("")).toBe(true);
  });

  it("should return false for non-null, non-undefined, and non-empty values", () => {
    expect(isNullEmptyOrUndefined("hello")).toBe(false);
    expect(isNullEmptyOrUndefined(123)).toBe(false);
    expect(isNullEmptyOrUndefined({})).toBe(false);
  });
});

describe("toTitleCase", () => {
  it("should convert a string to title case", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("should return an empty string for null or undefined input", () => {
    expect(toTitleCase(null)).toBe("");
    expect(toTitleCase(undefined)).toBe("");
  });
});

describe("nameToTwoLetters", () => {
  it("should return the first letter of a single word name", () => {
    expect(nameToTwoLetters("John")).toBe("J");
  });

  it("should return the initials of the first and second word in a name", () => {
    expect(nameToTwoLetters("John Doe")).toBe("JD");
  });

  it("should return an empty string for null or undefined input", () => {
    expect(nameToTwoLetters(null)).toBe("");
    expect(nameToTwoLetters(undefined)).toBe("");
  });
});

describe("stripLink", () => {
  it("should strip query parameters from a URL", () => {
    expect(stripLink("https://example.com?param=value")).toBe(
      "https://example.com"
    );
  });

  it("should return the original URL if there are no query parameters", () => {
    expect(stripLink("https://example.com")).toBe("https://example.com");
  });
});

describe("duplicateStringValue", () => {
  it("should increment a number in parentheses at the end of the string", () => {
    expect(duplicateStringValue("test (1)")).toBe("test (2)");
  });

  it("should add (2) to the end of the string if no number exists", () => {
    expect(duplicateStringValue("test")).toBe("test (2)");
  });

  it("should return an empty string for null or undefined input", () => {
    expect(duplicateStringValue(null)).toBe("");
    expect(duplicateStringValue(undefined)).toBe("");
  });
});

describe("findSpecialChars", () => {
  it("should return all unique special characters found in a string", () => {
    const str = "Hello! #This%is$a test?";
    expect(findSpecialChars(str)).toEqual(["#", "%", "$", "?"]);
  });

  it("should return an empty array if no special characters are found", () => {
    const str = "Hello World";
    expect(findSpecialChars(str)).toEqual([]);
  });
});

// numberFormatify.test.ts

import { describe, expect, it, vi } from "vitest";
import { numberFormatify } from "../numbers.helper";

vi.mock("./strings.helper", () => ({
  isNullEmptyOrUndefined: vi.fn().mockReturnValue(true),
}));

describe("numberFormatify", () => {
  it("should format a number as USD currency by default", () => {
    const value = 1234.56;
    const formattedValue = numberFormatify(value);

    expect(formattedValue).toBe("$1,234.56");
  });

  it("should format a string number as USD currency by default", () => {
    const value = "1234.56";
    const formattedValue = numberFormatify(value);

    expect(formattedValue).toBe("$1,234.56");
  });

  it("should return an empty string if value is empty", () => {
    const formattedValueEmpty = numberFormatify("");
    expect(formattedValueEmpty).toBe("");
  });

  it("should return an empty string for invalid string numbers", () => {
    const value = "invalid-string";
    const formattedValue = numberFormatify(value);

    expect(formattedValue).toBe("");
  });

  it("should apply custom formatting options if provided", () => {
    const value = 1234.56;
    const customOptions: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    const formattedValue = numberFormatify(value, customOptions);

    expect(formattedValue).toBe("1,235"); // Rounded without fraction digits
  });
});

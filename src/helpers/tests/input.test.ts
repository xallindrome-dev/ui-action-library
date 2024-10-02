import { describe, expect, it } from "vitest";
import {
  handleDecimalInputChange,
  handleNumberInputChange,
} from "../input.helper";

describe("handleNumberInputChange", () => {
  it("should return a valid number string", () => {
    const result = handleNumberInputChange("123", { max: 200, min: 100 });
    expect(result).toBe("123");
  });

  it("should return an empty string for invalid input", () => {
    const result = handleNumberInputChange("abc", { max: 200, min: 100 });
    expect(result).toBe("");
  });
});

describe("handleDecimalInputChange", () => {
  it("should return a valid decimal string", () => {
    const result = handleDecimalInputChange("123.45", { max: 200, min: 100 });
    expect(result).toBe("123.45");
  });

  it("should return an empty string for invalid decimal input", () => {
    const result = handleDecimalInputChange("abc", { max: 200, min: 100 });
    expect(result).toBe("");
  });
});

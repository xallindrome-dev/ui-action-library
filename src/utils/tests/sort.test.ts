// alphanumericAscendingSort.test.ts

import { describe, expect, it } from "vitest";
import { alphanumericAscendingSort } from "../sort.helper";

describe("alphanumericAscendingSort", () => {
  it("should sort special characters before numbers and letters", () => {
    const a = "@hello";
    const b = "123world";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBeLessThan(0); // a should come before b (special character first)
  });

  it("should sort numbers before letters", () => {
    const a = "123world";
    const b = "abcworld";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBeLessThan(0); // a should come before b (numbers first)
  });

  it("should sort letters lexicographically", () => {
    const a = "apple";
    const b = "banana";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBeLessThan(0); // "apple" should come before "banana"
  });

  it("should treat special characters as lower priority than letters", () => {
    const a = "hello";
    const b = "@hello";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBeGreaterThan(0); // "hello" should come after "@hello"
  });

  it("should sort strings with mixed numbers and letters lexicographically after priority", () => {
    const a = "abc123";
    const b = "abc456";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBeLessThan(0); // "abc123" should come before "abc456"
  });

  it("should return 0 for equal strings", () => {
    const a = "apple";
    const b = "apple";
    const result = alphanumericAscendingSort(a, b);
    expect(result).toBe(0); // Equal strings should return 0
  });
});

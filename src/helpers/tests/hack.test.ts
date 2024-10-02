// focus.test.ts

import { beforeEach, describe, expect, it, vi } from "vitest";
import { focus } from "../hack.helper";

describe("focus", () => {
  let inputElement: HTMLInputElement;

  // Before each test, add an input element to the document
  beforeEach(() => {
    document.body.innerHTML = '<input type="text" class="test-input" />';
    inputElement = document.querySelector(".test-input") as HTMLInputElement;
    vi.spyOn(inputElement, "focus"); // Spy on the focus method
  });

  it("should focus on the element matching the selector", () => {
    // Call the focus function with the selector
    focus(".test-input");

    // Assert that focus was called on the input element
    expect(inputElement.focus).toHaveBeenCalled();
  });

  it("should not throw an error if no element matches the selector", () => {
    // Call the focus function with a non-existent selector
    const action = () => focus(".non-existent-input");

    // Assert that it does not throw an error
    expect(action).not.toThrow();
  });
});

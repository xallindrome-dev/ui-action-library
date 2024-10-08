import type { RefObject } from "react";
import { describe, expect, it, vi } from "vitest";
import { scrollToElement } from "../scroll.helper";

// Mock a RefObject of a container element
const createMockRef = (childrenCount: number): RefObject<HTMLDivElement> => {
  const container = document.createElement("div");
  container.style.overflowX = "scroll";

  const childContainer = document.createElement("div");
  for (let i = 0; i < childrenCount; i++) {
    const child = document.createElement("div");
    childContainer.appendChild(child);
  }

  container.appendChild(childContainer);

  return { current: container } as RefObject<HTMLDivElement>;
};

describe("scrollToElement", () => {
  it("should scroll to the active element at the specified index", () => {
    const containerRef = createMockRef(5);
    const activeElementIndex = 2;

    // Set up the mock positions
    vi.spyOn(containerRef.current!, "getBoundingClientRect").mockReturnValue({
      left: 0,
    } as DOMRect);
    vi.spyOn(
      containerRef.current!.children[0].children[activeElementIndex],
      "getBoundingClientRect"
    ).mockReturnValue({
      left: 150,
    } as DOMRect);

    // Call the function
    scrollToElement(containerRef, activeElementIndex);

    // Assert the scroll position changed
    expect(containerRef.current!.scrollLeft).toBeGreaterThan(0);
  });

  it("should scroll by a specific amount when scrollAmount is provided", () => {
    const containerRef = createMockRef(5);
    const activeElementIndex = 2;
    const initialScrollLeft = containerRef.current!.scrollLeft;
    const scrollAmount = 50;

    scrollToElement(containerRef, activeElementIndex, scrollAmount);

    // Check that the scrollLeft has incremented by scrollAmount
    expect(containerRef.current!.scrollLeft).toBe(
      initialScrollLeft + scrollAmount
    );
  });

  it("should not scroll if the activeElementIndex is out of range", () => {
    const containerRef = createMockRef(5);
    const initialScrollLeft = containerRef.current!.scrollLeft;

    scrollToElement(containerRef, -1);

    // Check that scrollLeft hasn't changed
    expect(containerRef.current!.scrollLeft).toBe(initialScrollLeft);
  });

  it("should not scroll if containerRef.current is null", () => {
    const containerRef: RefObject<HTMLDivElement> = { current: null };
    expect(() => scrollToElement(containerRef, 0)).not.toThrow();
  });
});

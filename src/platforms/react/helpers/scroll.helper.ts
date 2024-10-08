/**
 * @module React_Platform
 * @category Scroll Helpers
 */

import type { RefObject } from "react";

/**
 * Scrolls a container horizontally to bring a specified child element into view.
 * If a scroll amount is provided, it scrolls by that amount instead of aligning with the element's position.
 *
 * @template T - The type of the HTML element, constrained to `HTMLDivElement` for scrolling purposes.
 *
 * @param containerRef - A reference to the container element that contains the items to scroll.
 * @param activeElementIndex - The index of the element within the container's child element to scroll to.
 *   - If the index is out of range or negative, no scrolling will occur.
 * @param scrollAmount - (Optional) A specific amount by which to scroll the container.
 *   - If `scrollAmount` is provided and greater than 0, it scrolls by this amount directly.
 *   - If `scrollAmount` is 0 or not provided, the container will scroll just enough to bring the specified element into view.
 */
export const scrollToElement = <T extends HTMLDivElement>(
  containerRef: RefObject<T>,
  activeElementIndex: number,
  scrollAmount = 0
) => {
  if (containerRef.current && activeElementIndex > -1) {
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const element =
      containerRef.current.children[0].children[activeElementIndex];

    if (element) {
      if (scrollAmount > 0) {
        containerRef.current.scrollLeft += scrollAmount;
      } else {
        const elementLeft = element.getBoundingClientRect().left;
        const scrollPosition = elementLeft - containerLeft;

        containerRef.current.scrollLeft += scrollPosition;
      }
    }
  }
};

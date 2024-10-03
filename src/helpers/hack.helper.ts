/**
 * Focuses on the first element in the document that matches the given CSS selector.
 *
 * @param selector - A string representing a CSS selector used to identify the element to focus on.
 *
 * @remarks This function selects the first matching element using `document.querySelectorAll`
 * and focuses on it. It assumes the selected element is an `HTMLInputElement`. If the element
 * is not found or is not focusable, this might throw an error.
 */
export const focus = (selector: string): void => {
  // hack until ref fixed
  const element = document.querySelectorAll(selector)[0] as HTMLInputElement;

  if (!element) {
    return;
  }

  element.focus();
};

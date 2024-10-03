type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * Creates a debounced function that delays the invocation of the given function
 * until after the specified `wait` time has passed since the last time the debounced function was invoked.
 *
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param immediate - If `true`, the function will be invoked on the leading edge of the wait interval instead of the trailing.
 *
 * @returns A debounced version of the given function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>): void => {
    // Using arrow function to bind `this`
    const later = () => {
      timeoutId = null;
      if (!immediate) {
        func(...args); // `this` context is automatically preserved
      }
    };

    const shouldCallNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);

    if (shouldCallNow) {
      func(...args);
    }
  };
}

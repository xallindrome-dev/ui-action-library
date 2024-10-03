import { useEffect, useState } from "react";

/**
 * Custom React hook that debounces a value, delaying updates to the value until after a specified delay.
 *
 * This hook is useful when you want to avoid updating a value too frequently, such as when typing in a search input.
 * It will return the debounced value only after the specified delay has passed without the value changing.
 *
 * @param value - The value to debounce. Can be any type (string, number, object, etc.).
 * @param delay - The debounce delay in milliseconds. The value will only update after this delay period.
 *
 * @returns The debounced value, which updates only after the delay has passed.
 */
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

/**
 * A utility function that debounces a given function, ensuring that it is only executed after a certain delay.
 * If the function is called again within the delay period, the previous call is canceled and the delay is restarted.
 *
 * @param fn - The function to debounce.
 * @param ms - The debounce delay in milliseconds.
 *
 * @returns A new function that will only execute `fn` after the delay has passed without any new calls.
 */
export const debounce = (fn: any, ms: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout((...args) => {
      clearTimeout(timer);
      fn.apply(this, args);
    }, ms);
  };
};

export default useDebounce;

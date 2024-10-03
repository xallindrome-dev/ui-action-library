import { useEffect, useLayoutEffect, useState } from "react";
import { debounce } from "../../../polyfill/debounce";

const WINDOW_VIEWPORT = 1250;

/**
 * Custom hook that returns the current window width, updating the value whenever the window is resized.
 * The resize event is debounced to avoid excessive updates.
 *
 * @param viewport - The default viewport width to use when `window` is not defined (e.g., server-side rendering). Defaults to 1250px.
 * @param debounceTime - The debounce time in milliseconds to delay the resize event handling. Defaults to 200ms.
 *
 * @returns The current window width, updated on window resize.
 */
export const useWindowResize = (
  viewport = WINDOW_VIEWPORT,
  debounceTime = 200
) => {
  const isWindowDefined = typeof window !== "undefined";
  const [windowWidth, setWindowWidth] = useState(
    isWindowDefined ? window.innerWidth : viewport
  );

  useEffect(() => {
    const isWindowDefined = typeof window !== "undefined";

    const handleWindowResize = debounce(() => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    }, debounceTime);

    if (isWindowDefined) {
      window.addEventListener("resize", handleWindowResize);
    }
    return () => {
      if (isWindowDefined) {
        window.removeEventListener("resize", handleWindowResize);
      }
    };
  }, [windowWidth, debounceTime]);

  return windowWidth;
};

/**
 * Custom hook that triggers a provided `handleResize` function on window resize.
 * The `handleResize` function is immediately invoked and then called on each subsequent window resize event.
 *
 * @param handleResize - A callback function to execute whenever the window is resized.
 */
export const useResize = (handleResize: () => void) => {
  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
};

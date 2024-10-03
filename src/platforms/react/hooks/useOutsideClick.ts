import type { Dispatch, RefObject, SetStateAction } from "react";
import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a specified DOM element and trigger a close action.
 * This is useful for closing dropdowns, modals, or popovers when the user clicks outside the element.
 *
 * @param ref - A reference to the DOM element we want to detect outside clicks for (usually a dropdown, modal, etc.).
 * @param isOpen - A boolean state that determines whether the element is currently open or not.
 * @param setIsOpen - A state setter function to update the `isOpen` state, typically closing the element when clicked outside.
 * @param onOutsideClick - (Optional) A callback function that is executed whenever an outside click is detected.
 * @param useCapture - (Optional) A boolean to determine whether the event listeners should be in capture phase. Defaults to `true`.
 *
 * @returns The current value of `isOpen`, which indicates whether the element is open or not.
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  onOutsideClick?: () => void,
  useCapture = true
) => {
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const isDescendantOfRoot =
        ref.current && ref.current.contains(e.target as Node);
      if (!isDescendantOfRoot) {
        document.addEventListener("mouseup", onMouseUp, {
          capture: useCapture,
        });
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      const isDescendantOfRoot =
        ref.current && ref.current.contains(e.target as Node);
      document.removeEventListener("mouseup", onMouseUp, {
        capture: useCapture,
      });

      if (!isDescendantOfRoot) {
        setIsOpen(false);
      }

      if (onOutsideClick) {
        onOutsideClick();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", onMouseDown, {
        capture: useCapture,
      });
    }

    return () => {
      document.removeEventListener("mousedown", onMouseDown, {
        capture: useCapture,
      });
      document.removeEventListener("mouseup", onMouseUp, {
        capture: useCapture,
      });
    };
  }, [isOpen, useCapture, onOutsideClick, setIsOpen, ref]);

  return isOpen;
};

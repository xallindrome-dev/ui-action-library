import { useEffect } from "react";

/**
 * Custom hook that warns the user when they attempt to navigate away from the page
 * if there are unsaved changes. This hook is typically used in forms or components
 * where unsaved changes need to be preserved.
 *
 * @param isDirty - A boolean flag indicating whether there are unsaved changes (e.g., in a form).
 *
 * This hook listens for the `beforeunload` event and prompts the user with a warning
 * if they try to leave the page while `isDirty` is true.
 */
const useWarnOnUnsavedChanges = (isDirty: boolean) => {
  useEffect(() => {
    /**
     * Event handler for the `beforeunload` event, which is triggered when the user
     * attempts to close the tab, refresh, or navigate away from the page.
     *
     * @param e - The `BeforeUnloadEvent` object, used to trigger the browser's navigation warning.
     */
    const handleNavigateAway = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
        return "You have unsaved changes. Are you sure you want to leave this page?";
      }
    };

    window.addEventListener("beforeunload", handleNavigateAway);

    return () => {
      window.removeEventListener("beforeunload", handleNavigateAway);
    };
  }, [isDirty]);
};

export default useWarnOnUnsavedChanges;

import { useLocation } from "react-router-dom";
import { stripLink } from "../../../utils";

/**
 * Custom hook that checks whether a given link is active based on the current URL path.
 *
 * This hook compares the current URL path (from `useLocation`) with the provided `link`.
 * It returns `true` if the current URL matches the provided link exactly or if it starts with the link (useful for nested routes).
 *
 * @param link - The URL or path to check for activity.
 *
 * @returns `true` if the link is active (the current path matches the link), otherwise `false`.
 */
function useActive(link: string): boolean {
  const { pathname } = useLocation();

  const strippedLink = stripLink(link);
  const isActive =
    pathname === strippedLink || pathname.startsWith(`${strippedLink}/`);

  return isActive;
}

export default useActive;

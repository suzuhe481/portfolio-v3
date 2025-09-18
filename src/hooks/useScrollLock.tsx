import { useEffect } from "react";

/**
 * A hook that locks or unlocks the scroll of the page.
 * @param {boolean} isLocked - Whether the scroll should be locked or not.
 * @returns {void} A cleanup function to unlock the scroll.
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isLocked) {
        // Prevents content shift when scroll is disabled.
        const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      } else {
        document.body.style.overflow = "unset";
        document.body.style.paddingRight = "0px";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isLocked]);
};

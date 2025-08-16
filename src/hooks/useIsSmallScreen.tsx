import { useState, useEffect } from "react";

export function useIsSmallScreen(breakpoint = 768) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    // Adding listener and cleanup
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [breakpoint]);

  return isSmallScreen;
}

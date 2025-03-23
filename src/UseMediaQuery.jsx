import { useEffect, useState } from "react";

function useMediaQuery(mediaQuery) {
  const [isMediaMatch, setIsMediaMatch] = useState(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const mqlHandler = () => setIsMediaMatch(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", mqlHandler);
    return () => {
      mediaQueryList.removeEventListener("change", mqlHandler);
    };
  }, [mediaQuery]);

  return isMediaMatch;
}

export default useMediaQuery;

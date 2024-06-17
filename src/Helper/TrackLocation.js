import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePreviousPathname = () => {
  const location = useLocation();
  const previousPathnameRef = useRef(location.pathname);

  useEffect(() => {
    previousPathnameRef.current = location.pathname;
  }, [location.pathname]);

  return previousPathnameRef.current;
};

export default usePreviousPathname;

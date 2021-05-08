import { useState, useLayoutEffect } from "react";

type TWindowSize = {
    width: number;
    height: number;
}

export default function useWindowSize() {
  const [size, setSize] = useState<TWindowSize>({
    width: 1440,
    height: 768,
  });

  useLayoutEffect(() => {
    function updateSize() {
      setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  return size;
}
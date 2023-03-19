import { useEffect } from "react";

export const useResizeObserver = (
  containerRef: React.RefObject<HTMLDivElement>,
  callback: (width: number, height: number) => void
) => {
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        callback(width, height);
      }
    };

    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerRef, callback]);
};
;

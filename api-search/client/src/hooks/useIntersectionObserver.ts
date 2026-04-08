import { useCallback, useRef, useState } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { root, rootMargin, threshold } = options;

  const targetRef = useCallback((node: HTMLDivElement | null) => {
    // Clean up the previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, { root, rootMargin, threshold });
      
      observerRef.current.observe(node);
    }
  }, [root, rootMargin, threshold]);

  return { targetRef, isIntersecting };
};
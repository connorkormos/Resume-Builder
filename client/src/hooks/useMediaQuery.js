import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query) {
   const subscribe = useCallback((onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
   }, [query]);

   return useSyncExternalStore(
      subscribe,
      () => window.matchMedia(query).matches,
      () => false,
   );
}

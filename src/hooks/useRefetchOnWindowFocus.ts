'use client';

import { useEffect } from 'react';

/**
 * Refetch when window gains focus (e.g. user switches back to the tab).
 * Keeps admin and client site data in sync without full page refresh.
 */
export function useRefetchOnWindowFocus(refetch: () => void | Promise<void>) {
  useEffect(() => {
    const handleFocus = () => {
      void refetch();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);
}

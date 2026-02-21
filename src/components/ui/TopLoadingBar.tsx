'use client';

import { useEffect, useState } from 'react';

interface TopLoadingBarProps {
  loading: boolean;
  className?: string;
}

export default function TopLoadingBar({ loading, className = '' }: TopLoadingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(false), 300);
    return () => clearTimeout(t);
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[9999] origin-left ${className}`}
      style={{
        animation: loading ? 'top-loading-bar 0.8s ease-out forwards' : 'top-loading-bar-done 0.3s ease-out forwards',
      }}
      role="progressbar"
      aria-valuenow={loading ? undefined : 100}
      aria-label="Loading"
    />
  );
}

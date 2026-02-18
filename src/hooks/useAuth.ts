'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * Auth context hook. Use only inside AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

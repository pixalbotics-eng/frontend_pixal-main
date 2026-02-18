'use client';

import { useContext } from 'react';
import { ToastContext } from '@/contexts/ToastContext';

/**
 * Toast context hook. Use only inside ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

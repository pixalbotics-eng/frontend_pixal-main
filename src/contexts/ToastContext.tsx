'use client';

import React, { createContext, useCallback, useState } from 'react';

export type ToastType = 'success' | 'error';

export interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

export interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  toast: ToastState;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });

  const show = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, TOAST_DURATION);
  }, []);

  const success = useCallback((message: string) => show(message, 'success'), [show]);
  const error = useCallback((message: string) => show(message, 'error'), [show]);

  return (
    <ToastContext.Provider value={{ success, error, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

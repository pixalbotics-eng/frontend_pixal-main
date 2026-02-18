'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks';

export default function ToastContainer() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !toast.visible) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-md">
      <div
        className={`rounded-lg border px-4 py-3 shadow-lg ${
          isSuccess
            ? 'border-green-200 bg-green-50 text-green-800'
            : 'border-red-200 bg-red-50 text-red-800'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl" aria-hidden>
            {isSuccess ? '✓' : '✕'}
          </span>
          <p className="text-sm font-medium leading-snug">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '@/api/config';
import { api } from '@/api/client';

const PING_INTERVAL_MS = 10 * 1000; // 10 seconds – keep server awake while site is open

export default function PingKeeper() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const isRenderOrRemote = typeof window !== 'undefined' &&
      API_BASE_URL &&
      (API_BASE_URL.includes('render.com') || API_BASE_URL.includes('onrender.com') || !API_BASE_URL.includes('localhost'));

    if (!isRenderOrRemote) return;

    const ping = () => {
      api.get(API_ENDPOINTS.PING).catch(() => {});
    };

    ping();
    intervalRef.current = setInterval(ping, PING_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}

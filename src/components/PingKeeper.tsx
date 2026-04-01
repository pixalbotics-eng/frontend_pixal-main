'use client';

import { useEffect, useRef } from 'react';
import { sendKeepalivePing, getPingUrl, PING_INTERVAL_MS } from '@/api/ping';

export default function PingKeeper() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const url = getPingUrl();
    const isLocal =
      !url ||
      url.includes('localhost') ||
      url.includes('127.0.0.1');

    if (isLocal) return;

    const ping = () => {
      void sendKeepalivePing();
    };

    ping();
    intervalRef.current = setInterval(ping, PING_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}

import { API_BASE_URL } from './config';

/**
 * Keepalive path on the main API host. Override the full URL with NEXT_PUBLIC_PING_URL
 * if ping must hit a different route or service.
 */
export const PING_PATH = '/ping';

export const PING_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export function getPingUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_PING_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}${PING_PATH.startsWith('/') ? PING_PATH : `/${PING_PATH}`}`;
}

/** Fire-and-forget GET — no JSON/auth; used only to wake idle hosts. */
export async function sendKeepalivePing(): Promise<void> {
  try {
    await fetch(getPingUrl(), {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
    });
  } catch {
    // ignore
  }
}

import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxies PDF request to avoid CORS when loading PDF in browser (e.g. for pdfjs in flipbook).
 * Usage: /api/proxy-pdf?url=<encoded-pdf-url>
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/pdf' },
      cache: 'no-store',
    });
    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }
    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}

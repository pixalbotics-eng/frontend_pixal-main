export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function toNum(v: unknown): number | undefined {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

/**
 * Builds {@link PaginationMeta} only from backend-shaped objects (camelCase or snake_case).
 * Does not guess extra pages from list length.
 *
 * @param fallbackLimit — request `limit` when the body omits `limit` / `per_page`.
 */
export function normalizeBackendPagination(raw: unknown, fallbackLimit?: number): PaginationMeta | null {
  if (raw == null || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;

  let page = toNum(o.page ?? o.currentPage ?? o.current_page);
  let limit = toNum(o.limit ?? o.pageSize ?? o.per_page ?? o.page_size) ?? fallbackLimit;
  let total = toNum(o.total ?? o.count ?? o.totalCount ?? o.total_count);
  let totalPages = toNum(o.totalPages ?? o.total_pages ?? o.pages);

  if (page == null || page < 1) page = 1;
  if (limit == null || limit < 1) return null;

  if (totalPages == null || totalPages < 1) {
    if (total != null && total >= 0) {
      totalPages = Math.max(1, Math.ceil(total / limit));
    } else {
      return null;
    }
  }

  if (total == null || total < 0) total = 0;

  return { page, limit, total, totalPages };
}

/** Collect pagination objects/fields from typical API envelopes. */
export function pickRawPagination(
  responseRoot: { pagination?: unknown; data?: unknown },
  data: Record<string, unknown> | undefined
): unknown {
  const candidates: unknown[] = [
    responseRoot.pagination,
    data?.pagination,
    (data?.meta as Record<string, unknown> | undefined)?.pagination,
  ];
  for (const c of candidates) {
    if (c != null && typeof c === 'object') return c;
  }
  if (
    data &&
    (data.totalPages != null ||
      data.total_pages != null ||
      data.pages != null ||
      (data.total != null && data.page != null))
  ) {
    return {
      page: data.page ?? data.currentPage ?? data.current_page,
      limit: data.limit ?? data.pageSize ?? data.per_page ?? data.page_size,
      total: data.total ?? data.count ?? data.totalCount ?? data.total_count,
      totalPages: data.totalPages ?? data.total_pages ?? data.pages,
    };
  }
  return null;
}

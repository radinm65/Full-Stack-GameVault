import { useEffect, useRef, useState } from "react";

import type IPage from "../core/interfaces/models/shared/IPage";

// The items loaded so far, and the query string they were loaded for
interface LoadedItems<T> {
  queryString: string;
  items: T[];
  nextCursor: string | null;
}

export default function useInfiniteScroll<T>(
  loadPage: (queryString: string, cursor: string | null) => Promise<IPage<T>>,
  queryString: string,
) {
  const [loaded, setLoaded] = useState<LoadedItems<T> | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const currentQuery = useRef(queryString);
  const isLoadingMore = useRef(false);

  // First page: runs on mount and whenever the query string changes
  useEffect(() => {
    currentQuery.current = queryString;
    isLoadingMore.current = false;

    loadPage(queryString, null).then((page) => {
      if (currentQuery.current !== queryString) return;
      setLoaded({ queryString, items: page.items, nextCursor: page.nextCursor });
    });
  }, [loadPage, queryString]);

  // While a new first page is on its way, the list on screen still belongs to the old query.
  // Its cursor must not be used with the new query, so there is no next page in that moment.
  const nextCursor = loaded?.queryString === queryString ? loaded.nextCursor : null;
  const hasMore = nextCursor !== null;

  // Next pages: watch the sentinel and request a page when it comes into view
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || nextCursor === null) return;

    function loadNextPage(cursor: string) {
      if (isLoadingMore.current) return;
      isLoadingMore.current = true;

      loadPage(queryString, cursor)
        .then((page) => {
          if (currentQuery.current !== queryString) return;
          setLoaded((previous) =>
            previous === null
              ? null
              : {
                  queryString,
                  items: [...previous.items, ...page.items],
                  nextCursor: page.nextCursor,
                },
          );
        })
        .finally(() => {
          // After a query change isLoadingMore already belongs to the new query, leave it alone
          if (currentQuery.current === queryString) isLoadingMore.current = false;
        });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadNextPage(nextCursor);
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadPage, queryString, nextCursor]);

  return { items: loaded?.items ?? null, hasMore, sentinelRef };
}

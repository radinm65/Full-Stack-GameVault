import "./PageNavigation.css";

import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import IPageNavigation from "../../core/interfaces/props/shared/IPageNavigation.props";

const MAX_LISTED_PAGES = 7;

// A page number, or "gap" for the "..." between two page numbers that are far apart
type PageItem = number | "gap";

// Decides what the navigation shows, e.g. [1, "gap", 4, 5, 6, "gap", 20] for page 5 of 20.
// With few pages, every page is shown. Otherwise only the first page, the last page, the current
// page and the pages right next to it.
function getPageItems(page: number, pageCount: number): PageItem[] {
  const items: PageItem[] = [];
  let lastShown = 0;

  for (let number = 1; number <= pageCount; number++) {
    const isShown =
      pageCount <= MAX_LISTED_PAGES ||
      number === 1 ||
      number === pageCount ||
      Math.abs(number - page) <= 1;

    if (!isShown) continue;

    // We skipped at least one page since the last number we showed
    if (number - lastShown > 1) items.push("gap");

    items.push(number);
    lastShown = number;
  }

  return items;
}

export default function PageNavigation({ page, pageCount, onPageChange }: IPageNavigation) {
  if (pageCount <= 1) return null;

  return (
    <nav className="page-navigation" aria-label="Pagination">
      {page > 1 && (
        <button type="button" className="page-navigation-step" onClick={() => onPageChange(page - 1)}>
          <IoArrowBack size={13} /> Prev
        </button>
      )}

      {getPageItems(page, pageCount).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="page-navigation-gap">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`page-navigation-page ${item === page ? "page-navigation-active" : ""}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}

      {page < pageCount && (
        <button type="button" className="page-navigation-step" onClick={() => onPageChange(page + 1)}>
          Next <IoArrowForward size={13} />
        </button>
      )}
    </nav>
  );
}

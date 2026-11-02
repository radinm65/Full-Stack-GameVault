import type { LibraryStatus } from "../core/interfaces/models/games/ILibraryGame";

// The text shown for each library status
export const statusLabels: Record<LibraryStatus, string> = {
  playing: "Playing",
  saved: "Saved",
  completed: "Completed",
  wishlisted: "Wishlisted",
};

// "Oct 28, 2026" for a date like "2026-10-28"
export function formatDate(dateText: string) {
  return new Date(dateText).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "today", "yesterday", "3 days ago" for a date like "2026-10-29"
export function timeAgo(dateText: string) {
  const days = Math.floor((Date.now() - new Date(dateText).getTime()) / 86_400_000);

  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

// ! MOCK: stands in for the filtering the API will do. Delete together with the dummy data
// ! once the games endpoints exist, the pages only ever send the query string.

import { ALL } from "../utils/gameFilters";

export function matchesText(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

export function matchesOption(value: string | number, filter: string) {
  return filter === ALL || String(value) === filter;
}

export function matchesRating(rating: number, filter: string) {
  return filter === ALL || rating >= Number(filter);
}

export function matchesPlaytime(hours: number, filter: string) {
  if (filter === ALL) return true;
  if (filter === "short") return hours < 20;
  if (filter === "medium") return hours >= 20 && hours < 50;
  return hours >= 50;
}

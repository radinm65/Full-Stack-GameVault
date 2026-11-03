import type Genre from "../core/interfaces/models/games/Genre";
import type { IFilterOption } from "../core/interfaces/props/shared/IFilterSelect.props";

export const ALL = "all";

export const genres: Genre[] = ["Action", "RPG", "Adventure", "Shooter", "Strategy", "Racing"];

export const ratingOptions: IFilterOption[] = [
  { value: ALL, label: "All" },
  { value: "4.5", label: "4.5+" },
  { value: "4", label: "4+" },
  { value: "3", label: "3+" },
];

export const playtimeOptions: IFilterOption[] = [
  { value: ALL, label: "All" },
  { value: "short", label: "Under 20h" },
  { value: "medium", label: "20-50h" },
  { value: "long", label: "50h+" },
];

// Builds the options of a filter dropdown from the games: "All" followed by each different value
// once, sorted. So the dropdown always lists whatever the data contains.
//   toOptions(["PC", "PC", "Xbox"])           -> All, PC, Xbox
//   toOptions([2020, 2022, 2020], true)       -> All, 2022, 2020   (newest first, good for years)
export function toOptions(values: (string | number)[], newestFirst = false): IFilterOption[] {
  // A Set keeps each value only once
  const differentValues = [...new Set(values)];

  differentValues.sort((a, b) => (a < b ? -1 : 1));
  if (newestFirst) differentValues.reverse();

  return [
    { value: ALL, label: "All" },
    ...differentValues.map((value) => ({ value: String(value), label: String(value) })),
  ];
}

// The text shown for a value, e.g. labelOf(options, "short") -> "Under 20h"
export function labelOf(options: IFilterOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

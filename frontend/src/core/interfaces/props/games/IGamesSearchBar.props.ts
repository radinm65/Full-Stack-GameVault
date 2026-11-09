import type { IFilterOption } from "../shared/IFilterSelect.props";

interface IGamesSearchBar {
  placeholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  // The sort dropdown next to the search box. Leave out all three for a page without a sort.
  sortValue?: string;
  sortOptions?: IFilterOption[];
  onSortChange?: (sort: string) => void;
}

export default IGamesSearchBar;

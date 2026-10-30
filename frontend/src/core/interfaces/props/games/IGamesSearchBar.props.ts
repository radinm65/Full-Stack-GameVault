import type { IFilterOption } from "../shared/IFilterSelect.props";

interface IGamesSearchBar {
  placeholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  sortValue: string;
  sortOptions: IFilterOption[];
  onSortChange: (sort: string) => void;
}

export default IGamesSearchBar;

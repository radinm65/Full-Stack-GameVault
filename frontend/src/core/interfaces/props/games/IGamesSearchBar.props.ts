import type { ReactNode } from "react";

import type { IFilterOption } from "../shared/IFilterSelect.props";

interface IGamesSearchBar {
  placeholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  // The sort dropdown next to the search box. Leave out all three for a page without a sort.
  sortValue?: string;
  sortOptions?: IFilterOption[];
  onSortChange?: (sort: string) => void;
  // Anything else that belongs next to the search box, e.g. the "Add Collection" button
  action?: ReactNode;
}

export default IGamesSearchBar;

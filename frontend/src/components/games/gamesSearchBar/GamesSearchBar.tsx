import "./GamesSearchBar.css";

import { IoSearchOutline } from "react-icons/io5";

import FilterSelect from "../../filterSelect/FilterSelect";
import IGamesSearchBar from "../../../core/interfaces/props/games/IGamesSearchBar.props";

export default function GamesSearchBar({
  placeholder,
  query,
  onQueryChange,
  sortValue,
  sortOptions,
  onSortChange,
}: IGamesSearchBar) {
  return (
    <div className="games-search-bar">
      <form className="games-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <IoSearchOutline size={20} aria-hidden="true" />
        <input
          type="search"
          name="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </form>

      {sortValue !== undefined && sortOptions && onSortChange && (
        <FilterSelect label="Sort" value={sortValue} options={sortOptions} onChange={onSortChange} />
      )}
    </div>
  );
}

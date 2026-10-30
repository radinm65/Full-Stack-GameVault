import { IoGameControllerOutline } from "react-icons/io5";

import GamesHeader from "../../../../components/games/gamesHeader/GamesHeader";
import GamesSearchBar from "../../../../components/games/gamesSearchBar/GamesSearchBar";
import GamesTabs from "../../../../components/games/gamesTabs/GamesTabs";
import GamesEmpty from "../../../../components/games/gamesEmpty/GamesEmpty";
import ExploreGameCard from "../../../../components/games/exploreGameCard/ExploreGameCard";
import FilterChips from "../../../../components/filterChips/FilterChips";
import FilterSelect from "../../../../components/filterSelect/FilterSelect";

import useDelayedInput from "../../../../hooks/useDelayedInput";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import useUrlFilters from "../../../../hooks/useUrlFilters";
import { exploreFacets, getExploreGames } from "../../../../services/exploreService";
import {
  ALL,
  genres,
  labelOf,
  playtimeOptions,
  ratingOptions,
} from "../../../../utils/gameFilters";

// The URL query string is the whole state of this tab: /games?genre=RPG&sort=title
// A value equal to its default is left out, so the clean page is just /games
// (the dashboard search lands here as /games?q=...)
const defaults = {
  q: "",
  genre: ALL,
  platform: ALL,
  developer: ALL,
  year: ALL,
  rating: ALL,
  playtime: ALL,
  sort: "rating",
};

const genreOptions = [
  { value: ALL, label: "All genres" },
  ...genres.map((genre) => ({ value: genre, label: genre })),
];

const sortOptions = [
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title" },
  { value: "hours", label: "Playtime" },
];

export default function ExploreTab() {
  const { filters, queryString, setFilter, clearFilters } = useUrlFilters(defaults);

  // The search box shows every keystroke, but the URL (and the server) only hear about it
  // once the user stops typing
  const [searchText, setSearchText] = useDelayedInput(filters.q, (text) => setFilter("q", text));

  // Filtering, sorting and paging happen on the server, this tab only sends the query string.
  // The next page is requested when the sentinel at the bottom scrolls into view.
  const { items: games, hasMore, sentinelRef } = useInfiniteScroll(getExploreGames, queryString);

  // The sort is a preference, not a filter, so it survives "Clear filters"
  const resetFilters = () => clearFilters(["sort"]);

  const platformLabel =
    filters.platform === ALL ? "All platforms" : labelOf(exploreFacets.platforms, filters.platform);

  return (
    <>
      <GamesHeader
        title="GAMES"
        subtitle="Follow your curiosity. Find your next favorite."
        statusIcon={IoGameControllerOutline}
        statusText="Curated for your PC library"
      />

      <div className="games-toolbar">
        <GamesSearchBar
          placeholder="Search Games and Explore Worlds"
          query={searchText}
          onQueryChange={setSearchText}
          sortValue={filters.sort}
          sortOptions={sortOptions}
          onSortChange={(next) => setFilter("sort", next)}
        />
        <FilterChips
          label="Genre"
          value={filters.genre}
          options={genreOptions}
          onChange={(next) => setFilter("genre", next)}
        />
        <div className="games-filters">
          <FilterSelect
            label="Platform"
            value={filters.platform}
            options={exploreFacets.platforms}
            onChange={(next) => setFilter("platform", next)}
          />
          <FilterSelect
            label="Developer"
            value={filters.developer}
            options={exploreFacets.developers}
            onChange={(next) => setFilter("developer", next)}
          />
          <FilterSelect
            label="Release Year"
            value={filters.year}
            options={exploreFacets.years}
            onChange={(next) => setFilter("year", next)}
          />
          <FilterSelect
            label="Rating"
            value={filters.rating}
            options={ratingOptions}
            onChange={(next) => setFilter("rating", next)}
          />
          <FilterSelect
            label="Playtime"
            value={filters.playtime}
            options={playtimeOptions}
            onChange={(next) => setFilter("playtime", next)}
          />
        </div>
      </div>

      <GamesTabs active="explore" />

      <section className="games-results">
        <p className="games-results-title">
          Infinite games for you · {platformLabel} · {labelOf(genreOptions, filters.genre)}
        </p>

        {games !== null && games.length === 0 && (
          <GamesEmpty message="No games match your search and filters." onReset={resetFilters} />
        )}

        {games !== null && games.length > 0 && (
          <div className="explore-grid">
            {games.map((game) => (
              <ExploreGameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {hasMore && <div ref={sentinelRef} className="games-sentinel" />}
      </section>
    </>
  );
}

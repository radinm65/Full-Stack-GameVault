import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import {
  IoArrowForward,
  IoCheckmarkOutline,
  IoGameControllerOutline,
  IoLibraryOutline,
  IoPlayOutline,
  IoSaveOutline,
} from "react-icons/io5";

import GamesHeader from "../../../../components/games/gamesHeader/GamesHeader";
import GamesSearchBar from "../../../../components/games/gamesSearchBar/GamesSearchBar";
import GamesTabs from "../../../../components/games/gamesTabs/GamesTabs";
import GamesEmpty from "../../../../components/games/gamesEmpty/GamesEmpty";
import LibraryGameCard from "../../../../components/games/libraryGameCard/LibraryGameCard";
import WishlistModal from "../../../../components/games/wishlistModal/WishlistModal";
import StatsRow from "../../../../components/dashboard/statsRow/StatsRow";
import FilterChips from "../../../../components/filterChips/FilterChips";
import FilterSelect from "../../../../components/filterSelect/FilterSelect";
import PageNavigation from "../../../../components/pageNavigation/PageNavigation";

import IDashboardStat from "../../../../core/interfaces/models/dashboard/IDashboardStat";
import useDelayedInput from "../../../../hooks/useDelayedInput";
import useLoadData from "../../../../hooks/useLoadData";
import useUrlFilters from "../../../../hooks/useUrlFilters";
import { getLibraryGames, libraryFacets } from "../../../../services/libraryService";
import { ALL, genres, playtimeOptions, ratingOptions } from "../../../../utils/gameFilters";

// The URL query string is the whole state of this tab: /games?tab=library&status=playing&page=2
// A value equal to its default is left out, so the clean page is just /games?tab=library
// The wishlist modal is not part of it: it is plain component state, since the wishlist is small
// and never needs server-side filtering (the dashboard link adds ?wishlist=open, see below)
const defaults = {
  q: "",
  status: ALL,
  platform: ALL,
  genre: ALL,
  developer: ALL,
  year: ALL,
  rating: ALL,
  playtime: ALL,
  sort: "lastPlayed",
  page: "1",
};

const sortOptions = [
  { value: "lastPlayed", label: "Last played" },
  { value: "title", label: "Title" },
  { value: "progress", label: "Progress" },
  { value: "hours", label: "Hours played" },
  { value: "rating", label: "Rating" },
];

const genreOptions = [
  { value: ALL, label: "All" },
  ...genres.map((genre) => ({ value: genre, label: genre })),
];

export default function LibraryTab() {
  const { filters, queryString, setFilter, clearFilters } = useUrlFilters(defaults);

  // The search box shows every keystroke, but the URL (and the server) only hear about it
  // once the user stops typing
  const [searchText, setSearchText] = useDelayedInput(filters.q, (text) => setFilter("q", text));

  // The dashboard's wishlist link arrives as /games?tab=library&wishlist=open. That only decides
  // whether the modal starts open. Then the param is removed from the URL, so it never becomes
  // part of `queryString` (which would reload the library) and a refresh does not reopen the modal.
  const [searchParams, setSearchParams] = useSearchParams();
  const [wishlistOpen, setWishlistOpen] = useState(searchParams.get("wishlist") === "open");

  useEffect(() => {
    if (!searchParams.has("wishlist")) return;

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("wishlist");
        return nextParams;
      },
      { replace: true },
    );
  }, [searchParams, setSearchParams]);

  // Filtering, sorting, counting and paging happen on the server, this tab only sends the query string
  const library = useLoadData(getLibraryGames, queryString);
  const counts = library?.counts;

  const stats: IDashboardStat[] = [
    { id: "all", value: String(counts?.all ?? "–"), label: "All games", icon: IoGameControllerOutline },
    { id: "playing", value: String(counts?.playing ?? "–"), label: "Playing", icon: IoPlayOutline },
    { id: "saved", value: String(counts?.saved ?? "–"), label: "Saved", icon: IoSaveOutline },
    { id: "completed", value: String(counts?.completed ?? "–"), label: "Completed", icon: IoCheckmarkOutline },
  ];

  const statusOptions = [
    { value: ALL, label: "All games", count: counts?.all },
    { value: "playing", label: "Playing", count: counts?.playing },
    { value: "saved", label: "Saved", count: counts?.saved },
    { value: "completed", label: "Completed", count: counts?.completed },
  ];

  const changePage = (next: number) => {
    setFilter("page", String(next));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The sort is a preference, not a filter, so it survives "Clear filters"
  const resetFilters = () => clearFilters(["sort"]);

  return (
    <>
      <GamesHeader
        title="LIBRARY"
        subtitle="Every adventure, organized. Play at your own pace."
        statusIcon={IoLibraryOutline}
        statusText="Your collection is up to date"
        action={
          <button
            type="button"
            className="library-wishlist-button"
            aria-haspopup="dialog"
            onClick={() => setWishlistOpen(true)}
          >
            View Wishlist
            <IoArrowForward size={18} />
          </button>
        }
      />

      <StatsRow stats={stats} />

      <div className="games-toolbar">
        <GamesSearchBar
          placeholder="Search your library"
          query={searchText}
          onQueryChange={setSearchText}
          sortValue={filters.sort}
          sortOptions={sortOptions}
          onSortChange={(next) => setFilter("sort", next)}
        />
        <FilterChips
          label="Status"
          value={filters.status}
          options={statusOptions}
          onChange={(next) => setFilter("status", next)}
        />
        <div className="games-filters">
          <FilterSelect
            label="Platform"
            value={filters.platform}
            options={libraryFacets.platforms}
            onChange={(next) => setFilter("platform", next)}
          />
          <FilterSelect
            label="Genre"
            value={filters.genre}
            options={genreOptions}
            onChange={(next) => setFilter("genre", next)}
          />
          <FilterSelect
            label="Developer"
            value={filters.developer}
            options={libraryFacets.developers}
            onChange={(next) => setFilter("developer", next)}
          />
          <FilterSelect
            label="Release Year"
            value={filters.year}
            options={libraryFacets.years}
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

      <GamesTabs active="library" />

      <section className="games-results">
        {library !== null && library.games.length === 0 && (
          <GamesEmpty message="No games match your search and filters." onReset={resetFilters} />
        )}

        {library !== null && library.games.length > 0 && (
          <div className="library-grid">
            {library.games.map((game) => (
              <LibraryGameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {library !== null && (
          <PageNavigation page={library.page} pageCount={library.pageCount} onPageChange={changePage} />
        )}
      </section>

      {wishlistOpen && <WishlistModal onClose={() => setWishlistOpen(false)} />}
    </>
  );
}

import IExploreGame from "../core/interfaces/models/games/IExploreGame";
import type IPage from "../core/interfaces/models/shared/IPage";
import { ALL, toOptions } from "../utils/gameFilters";
import { matchesOption, matchesPlaytime, matchesRating, matchesText } from "./gameQueryMock";

// ! DUMMY DATA: replace with GET /api/games
// ! (query: q, genre, platform, developer, year, rating, playtime, sort, cursor)
// ! Filtering, sorting and paging happen on the server, the page only sends the query string.
// ! "trending" is computed by the server as well.

const dummyGames: IExploreGame[] = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    publisher: "Sony",
    developer: "Insomniac Games",
    year: 2022,
    genre: "Action",
    setting: "Open world",
    platform: "PC",
    rating: 4.5,
    hoursToBeat: 20,
    achievements: 78,
    cover: "/images/HorizontalGameCover/spider.jpg",
    trending: true,
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    publisher: "CD Projekt",
    developer: "CD Projekt Red",
    year: 2020,
    genre: "Action",
    setting: "Open world",
    platform: "PC",
    rating: 4.3,
    hoursToBeat: 50,
    achievements: 44,
    cover: "/images/HorizontalGameCover/Cyber.jpg",
    trending: false,
  },
  {
    id: 3,
    title: "Forza Horizon 5",
    publisher: "Xbox Game Studios",
    developer: "Playground Games",
    year: 2021,
    genre: "Racing",
    setting: "Open world",
    platform: "PC",
    rating: 4.6,
    hoursToBeat: 40,
    achievements: 60,
    cover: "/images/HorizontalGameCover/Forza.jpg",
    trending: true,
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    publisher: "Rockstar",
    developer: "Rockstar Games",
    year: 2019,
    genre: "Adventure",
    setting: "Open world",
    platform: "PC",
    rating: 4.9,
    hoursToBeat: 60,
    achievements: 52,
    cover: "/images/HorizontalGameCover/Reddead.jpg",
    trending: false,
  },
  {
    id: 5,
    title: "The Last of Us Part I",
    publisher: "Sony",
    developer: "Naughty Dog",
    year: 2022,
    genre: "Adventure",
    setting: "Linear",
    platform: "PC",
    rating: 4.8,
    hoursToBeat: 15,
    achievements: 36,
    cover: "/images/HorizontalGameCover/TLOU.jpg",
    trending: true,
  },
  {
    id: 6,
    title: "Lords of the Fallen",
    publisher: "CI Games",
    developer: "Hexworks",
    year: 2023,
    genre: "RPG",
    setting: "Soulslike",
    platform: "PC",
    rating: 3.9,
    hoursToBeat: 30,
    achievements: 50,
    cover: "/images/PublicHomeGameCovers/LordsOfTheFallen.png",
    trending: false,
  },
];

const sorters: Record<string, (a: IExploreGame, b: IExploreGame) => number> = {
  rating: (a, b) => b.rating - a.rating,
  newest: (a, b) => b.year - a.year,
  title: (a, b) => a.title.localeCompare(b.title),
  hours: (a, b) => b.hoursToBeat - a.hoursToBeat,
};

// ! Option lists for the filter dropdowns: replace with GET /api/games/facets
export const exploreFacets = {
  platforms: toOptions(dummyGames.map((game) => game.platform)),
  developers: toOptions(dummyGames.map((game) => game.developer)),
  years: toOptions(dummyGames.map((game) => game.year), true),
};

// ! MOCK: the server decides the page size, the client never sends one. Small on purpose so
// ! the paging is visible with only a few dummy games.
const PAGE_SIZE = 3;

// `queryString` is the page's query string ("genre=RPG&sort=title"). `cursor` is null for the first
// page and the previous page's `nextCursor` afterwards. Both are exactly what the API receives.
// ! The mock cursor is an offset, the real one is whatever the server returns (opaque to the client).
export async function getExploreGames(
  queryString: string,
  cursor: string | null,
): Promise<IPage<IExploreGame>> {
  const params = new URLSearchParams(queryString);
  const filter = (key: string) => params.get(key) ?? ALL;
  const sorter = sorters[params.get("sort") ?? "rating"] ?? sorters.rating;

  const matches = dummyGames
    .filter(
      (game) =>
        matchesText(game.title, params.get("q") ?? "") &&
        matchesOption(game.genre, filter("genre")) &&
        matchesOption(game.platform, filter("platform")) &&
        matchesOption(game.developer, filter("developer")) &&
        matchesOption(game.year, filter("year")) &&
        matchesRating(game.rating, filter("rating")) &&
        matchesPlaytime(game.hoursToBeat, filter("playtime")),
    )
    .sort(sorter);

  const start = Number(cursor ?? 0);
  const end = start + PAGE_SIZE;

  return {
    items: matches.slice(start, end),
    nextCursor: end < matches.length ? String(end) : null,
  };
}

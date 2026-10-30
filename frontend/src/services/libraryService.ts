import ILibraryGame from "../core/interfaces/models/games/ILibraryGame";
import ILibraryResult from "../core/interfaces/models/games/ILibraryResult";
import { ALL, toOptions } from "../utils/gameFilters";
import { matchesOption, matchesPlaytime, matchesRating, matchesText } from "./gameQueryMock";

// ! DUMMY DATA: replace with GET /api/library and GET /api/wishlist
// ! (library query: q, status, platform, genre, developer, year, rating, playtime, sort, page)
// ! Filtering, sorting and paging happen on the server, the page only sends the query string.
// ! Status counts cover the whole library, not only the current page or filters.

const dummyLibrary: ILibraryGame[] = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    cover: "/images/HorizontalGameCover/spider.jpg",
    status: "playing",
    genre: "Action",
    developer: "Insomniac Games",
    platform: "PC",
    year: 2022,
    rating: 4.5,
    hoursPlayed: 28,
    hoursToBeat: 20,
    achievementsUnlocked: 38,
    achievementsTotal: 78,
    progress: 62,
    lastPlayedAt: "2026-10-29",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    cover: "/images/VarticalGameCover/Cyber.webp",
    status: "playing",
    genre: "Action",
    developer: "CD Projekt Red",
    platform: "PC",
    year: 2020,
    rating: 4.3,
    hoursPlayed: 35,
    hoursToBeat: 50,
    achievementsUnlocked: 22,
    achievementsTotal: 44,
    progress: 41,
    lastPlayedAt: "2026-10-27",
  },
  {
    id: 3,
    title: "Forza Horizon 5",
    cover: "/images/HorizontalGameCover/Forza.jpg",
    status: "playing",
    genre: "Racing",
    developer: "Playground Games",
    platform: "PC",
    year: 2021,
    rating: 4.6,
    hoursPlayed: 52,
    hoursToBeat: 40,
    achievementsUnlocked: 41,
    achievementsTotal: 60,
    progress: 74,
    lastPlayedAt: "2026-10-25",
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    cover: "/images/HorizontalGameCover/Reddead.jpg",
    status: "saved",
    genre: "Adventure",
    developer: "Rockstar Games",
    platform: "PC",
    year: 2019,
    rating: 4.9,
    hoursPlayed: 0,
    hoursToBeat: 60,
    achievementsUnlocked: 0,
    achievementsTotal: 52,
    progress: 0,
  },
  {
    id: 5,
    title: "The Last of Us Part I",
    cover: "/images/VarticalGameCover/TLOU.png",
    status: "saved",
    genre: "Adventure",
    developer: "Naughty Dog",
    platform: "PC",
    year: 2022,
    rating: 4.8,
    hoursPlayed: 0,
    hoursToBeat: 15,
    achievementsUnlocked: 0,
    achievementsTotal: 36,
    progress: 0,
  },
  {
    id: 6,
    title: "Lords of the Fallen",
    cover: "/images/PublicHomeGameCovers/LordsOfTheFallen.png",
    status: "saved",
    genre: "RPG",
    developer: "Hexworks",
    platform: "PC",
    year: 2023,
    rating: 3.9,
    hoursPlayed: 0,
    hoursToBeat: 30,
    achievementsUnlocked: 0,
    achievementsTotal: 50,
    progress: 0,
  },
  {
    id: 7,
    title: "Red Dead Redemption",
    cover: "/images/HorizontalGameCover/Reddead.jpg",
    status: "saved",
    genre: "Adventure",
    developer: "Rockstar Games",
    platform: "PC",
    year: 2010,
    rating: 4.7,
    hoursPlayed: 0,
    hoursToBeat: 20,
    achievementsUnlocked: 0,
    achievementsTotal: 42,
    progress: 0,
  },
  {
    id: 8,
    title: "Marvel's Spider-Man: Miles Morales",
    cover: "/images/HorizontalGameCover/spider.jpg",
    status: "completed",
    genre: "Action",
    developer: "Insomniac Games",
    platform: "PC",
    year: 2022,
    rating: 4.4,
    hoursPlayed: 15,
    hoursToBeat: 15,
    achievementsUnlocked: 36,
    achievementsTotal: 36,
    progress: 100,
    lastPlayedAt: "2026-09-12",
  },
  {
    id: 9,
    title: "Forza Horizon 4",
    cover: "/images/HorizontalGameCover/Forza.jpg",
    status: "completed",
    genre: "Racing",
    developer: "Playground Games",
    platform: "PC",
    year: 2018,
    rating: 4.5,
    hoursPlayed: 68,
    hoursToBeat: 40,
    achievementsUnlocked: 52,
    achievementsTotal: 60,
    progress: 100,
    lastPlayedAt: "2026-08-03",
  },
  {
    id: 10,
    title: "The Last of Us Part II Remastered",
    cover: "/images/VarticalGameCover/TLOU.png",
    status: "completed",
    genre: "Adventure",
    developer: "Naughty Dog",
    platform: "PC",
    year: 2025,
    rating: 4.7,
    hoursPlayed: 28,
    hoursToBeat: 25,
    achievementsUnlocked: 45,
    achievementsTotal: 45,
    progress: 100,
    lastPlayedAt: "2026-07-21",
  },
  {
    id: 11,
    title: "Cyberpunk 2077: Phantom Liberty",
    cover: "/images/VarticalGameCover/Cyber.webp",
    status: "wishlisted",
    genre: "Action",
    developer: "CD Projekt Red",
    platform: "PC",
    year: 2023,
    rating: 4.8,
    hoursPlayed: 0,
    hoursToBeat: 15,
    achievementsUnlocked: 0,
    achievementsTotal: 20,
    progress: 0,
  },
  {
    id: 12,
    title: "Forza Motorsport",
    cover: "/images/HorizontalGameCover/Forza.jpg",
    status: "wishlisted",
    genre: "Racing",
    developer: "Turn 10 Studios",
    platform: "PC",
    year: 2023,
    rating: 3.7,
    hoursPlayed: 0,
    hoursToBeat: 30,
    achievementsUnlocked: 0,
    achievementsTotal: 50,
    progress: 0,
  },
];

const PAGE_SIZE = 8;

const sorters: Record<string, (a: ILibraryGame, b: ILibraryGame) => number> = {
  lastPlayed: (a, b) => (b.lastPlayedAt ?? "").localeCompare(a.lastPlayedAt ?? ""),
  title: (a, b) => a.title.localeCompare(b.title),
  progress: (a, b) => b.progress - a.progress,
  hours: (a, b) => b.hoursPlayed - a.hoursPlayed,
  rating: (a, b) => b.rating - a.rating,
};

// Wishlisted games are not part of the collection, so they stay out of the library and its counts
const owned = dummyLibrary.filter((game) => game.status !== "wishlisted");
const countOf = (status: ILibraryGame["status"]) =>
  owned.filter((game) => game.status === status).length;

// ! Option lists for the filter dropdowns: replace with GET /api/library/facets
export const libraryFacets = {
  platforms: toOptions(owned.map((game) => game.platform)),
  developers: toOptions(owned.map((game) => game.developer)),
  years: toOptions(owned.map((game) => game.year), true),
};

// `queryString` is the page's query string ("status=playing&page=2"), exactly what the API receives
export async function getLibraryGames(queryString: string): Promise<ILibraryResult> {
  const params = new URLSearchParams(queryString);
  const filter = (key: string) => params.get(key) ?? ALL;
  const sorter = sorters[params.get("sort") ?? "lastPlayed"] ?? sorters.lastPlayed;

  const matches = owned
    .filter(
      (game) =>
        matchesOption(game.status, filter("status")) &&
        matchesText(game.title, params.get("q") ?? "") &&
        matchesOption(game.platform, filter("platform")) &&
        matchesOption(game.genre, filter("genre")) &&
        matchesOption(game.developer, filter("developer")) &&
        matchesOption(game.year, filter("year")) &&
        matchesRating(game.rating, filter("rating")) &&
        matchesPlaytime(game.hoursPlayed, filter("playtime")),
    )
    .sort(sorter);

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(params.get("page")) || 1), pageCount);

  return {
    games: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    pageCount,
    counts: {
      all: owned.length,
      playing: countOf("playing"),
      saved: countOf("saved"),
      completed: countOf("completed"),
    },
  };
}

export async function getWishlistGames(): Promise<ILibraryGame[]> {
  return dummyLibrary.filter((game) => game.status === "wishlisted");
}

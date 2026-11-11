import type ICollection from "../core/interfaces/models/collections/ICollection";
import type { ICollectionGame } from "../core/interfaces/models/collections/ICollection";
import type IPage from "../core/interfaces/models/shared/IPage";
import { dummyLibrary } from "./libraryService";

// ! DUMMY DATA: replace with GET /api/collections (query: q, cursor). Searching and paging happen on
// ! the server, the page only sends the query string.

// A collection made of games of the library, found by their ids
function makeCollection(id: number, name: string, gameIds: number[]): ICollection {
  const games = gameIds
    .map((gameId) => dummyLibrary.find((game) => game.id === gameId))
    .filter((game) => game !== undefined)
    .map(({ id: gameId, title, cover }) => ({ id: gameId, title, cover }));

  return { id, name, games };
}

// Games 1, 2 and 3 of the library are the ones the user is playing now. Some collections already have
// them, some do not, so the "add playing games" box has something to show.
const dummyCollections: ICollection[] = [
  makeCollection(1, "Shooting Games", [2, 4, 5, 6, 7, 8, 9, 10]),
  makeCollection(2, "Racing Nights", [3, 4, 5, 6, 7, 8, 9, 10, 11]),
  makeCollection(3, "Story Rich", [5, 6, 7]),
  makeCollection(4, "Open World Favorites", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  makeCollection(5, "Co-op With Friends", [1, 5]),
  makeCollection(6, "Hidden Gems", [4, 6, 8, 9, 10, 11, 12]),
  makeCollection(7, "Play Next", [7, 8, 9]),
  makeCollection(8, "Perfect Soundtracks", [1, 2, 3, 5, 6, 7, 8, 9]),
  makeCollection(9, "Hardest Bosses", [10, 11]),
  makeCollection(10, "Weekend Comfort", [3, 5, 6, 7, 8, 9, 10, 12]),
];

// The mock page size. The server decides it, the client never sends one.
const PAGE_SIZE = 6;

// `queryString` can hold q (a part of the collection name)
// ! The mock cursor is an offset, the real one is whatever the server returns (opaque to the client).
export async function getCollections(
  queryString: string,
  cursor: string | null,
): Promise<IPage<ICollection>> {
  const search = (new URLSearchParams(queryString).get("q") ?? "").trim().toLowerCase();
  const matches = dummyCollections.filter((collection) =>
    collection.name.toLowerCase().includes(search),
  );

  const start = Number(cursor ?? 0);
  const end = start + PAGE_SIZE;

  return {
    items: matches.slice(start, end),
    nextCursor: end < matches.length ? String(end) : null,
  };
}

// ! Replace with POST /api/collections { name }. The server returns the new (empty) collection.
export async function createCollection(name: string): Promise<ICollection> {
  return { id: Date.now(), name, games: [] };
}

// ! Replace with DELETE /api/collections/:id
export async function deleteCollection(collectionId: number): Promise<void> {
  void collectionId;
}

// ! Replace with POST /api/collections/:id/games { gameId }
export async function addGameToCollection(collectionId: number, gameId: number): Promise<void> {
  void collectionId;
  void gameId;
}

// ! DUMMY DATA: the games the user is playing now. Replace with GET /api/library?status=playing
// ! (all of them, the box asks for them when it opens)
export async function getPlayingGames(): Promise<ICollectionGame[]> {
  return dummyLibrary
    .filter((game) => game.status === "playing")
    .map(({ id, title, cover }) => ({ id, title, cover }));
}

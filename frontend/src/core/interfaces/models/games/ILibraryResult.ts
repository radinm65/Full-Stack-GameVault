import type ILibraryGame from "./ILibraryGame";

interface ILibraryCounts {
  all: number;
  playing: number;
  saved: number;
  completed: number;
}

// One page of the library plus the numbers that cover the whole library
interface ILibraryResult {
  games: ILibraryGame[];
  page: number;
  pageCount: number;
  counts: ILibraryCounts;
}

export type { ILibraryCounts };
export default ILibraryResult;

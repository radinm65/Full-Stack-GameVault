import type Genre from "./Genre";

type LibraryStatus = "playing" | "saved" | "completed" | "wishlisted";

interface ILibraryGame {
  id: number;
  title: string;
  cover: string;
  status: LibraryStatus;
  genre: Genre;
  developer: string;
  platform: string;
  year: number;
  rating: number;
  hoursPlayed: number;
  hoursToBeat: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
  progress: number;
  lastPlayedAt?: string;
}

export type { LibraryStatus };
export default ILibraryGame;

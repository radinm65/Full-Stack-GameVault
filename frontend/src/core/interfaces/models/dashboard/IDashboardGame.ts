type Genre = "Action" | "Racing" | "Adventure";

interface IDashboardGame {
  id: number;
  title: string;
  publisher: string;
  year: number;
  genre: Genre;
  rating: number;
  cover: string;
  progress: number;
  hoursPlayed: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
  price?: number;
}

export default IDashboardGame;

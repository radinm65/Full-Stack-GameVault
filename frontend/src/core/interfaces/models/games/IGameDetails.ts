import type IAchievement from "./IAchievement";
import type ILibraryGame from "./ILibraryGame";

// Achievements are shown in groups, e.g. Playtime 8 / 12
interface IAchievementGroup {
  id: string;
  label: string;
  unlocked: number;
  total: number;
}

// How many ratings gave this many stars, as a share of all ratings (0 to 100)
interface IRatingBar {
  stars: number;
  percent: number;
}

interface IGameReview {
  id: number;
  author: string;
  stars: number;
  postedAgo: string;
  text: string;
}

// Everything the game modal shows. Starts from the library game, so the card data is included.
interface IGameDetails extends ILibraryGame {
  publisher: string;
  // A horizontal image of the game, used as the background of the modal (the cover is the vertical poster)
  backdrop: string;
  description: string;
  ratingCount: number;
  screenshots: string[];
  achievementGroups: IAchievementGroup[];
  achievements: IAchievement[];
  ratingBars: IRatingBar[];
  reviews: IGameReview[];
  related: ILibraryGame[];
}

export type { IAchievementGroup, IRatingBar, IGameReview };
export default IGameDetails;

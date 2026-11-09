import type { IGameReview } from "../../models/games/IGameDetails";

interface IGameReviews {
  // The reviews that came from the server
  reviews: IGameReview[];
}

export default IGameReviews;

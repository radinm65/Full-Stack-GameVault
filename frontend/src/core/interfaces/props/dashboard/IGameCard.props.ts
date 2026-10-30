import type IDashboardGame from "../../models/dashboard/IDashboardGame";

interface IGameCard {
  game: IDashboardGame;
  variant: "progress" | "wishlist";
}

export default IGameCard;

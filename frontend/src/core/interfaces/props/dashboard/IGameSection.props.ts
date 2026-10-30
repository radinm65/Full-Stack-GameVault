import type IDashboardGame from "../../models/dashboard/IDashboardGame";

interface IGameSection {
  title: string;
  linkText: string;
  linkTo: string;
  games: IDashboardGame[];
  variant?: "progress" | "wishlist";
}

export default IGameSection;

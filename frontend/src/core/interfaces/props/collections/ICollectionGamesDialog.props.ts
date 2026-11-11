import type ICollection from "../../models/collections/ICollection";
import type { ICollectionGame } from "../../models/collections/ICollection";

interface ICollectionGamesDialog {
  collection: ICollection;
  onAddGame: (game: ICollectionGame) => void;
  onClose: () => void;
}

export default ICollectionGamesDialog;

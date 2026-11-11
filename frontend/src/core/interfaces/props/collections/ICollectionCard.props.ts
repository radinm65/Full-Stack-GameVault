import type ICollection from "../../models/collections/ICollection";

interface ICollectionCard {
  collection: ICollection;
  // Clicking the card: opens the box to add games to the collection
  onOpen: () => void;
  // The x in the top right corner
  onDelete: () => void;
}

export default ICollectionCard;

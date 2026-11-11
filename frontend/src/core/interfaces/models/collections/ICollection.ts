// A game inside a collection (and a game the user can add to one)
interface ICollectionGame {
  // The id of the game, the same id as in the library
  id: number;
  title: string;
  cover: string;
}

interface ICollection {
  id: number;
  name: string;
  // The games in the collection. The card shows the covers of the first 8 (2 rows of 4).
  games: ICollectionGame[];
}

export type { ICollectionGame };
export default ICollection;

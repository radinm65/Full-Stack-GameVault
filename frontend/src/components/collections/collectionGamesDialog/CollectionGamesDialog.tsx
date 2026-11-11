import "./CollectionGamesDialog.css";

import { IoAdd } from "react-icons/io5";

import Dialog from "../../dialog/Dialog";
import ICollectionGamesDialog from "../../../core/interfaces/props/collections/ICollectionGamesDialog.props";
import useLoadData from "../../../hooks/useLoadData";
import { getPlayingGames } from "../../../services/collectionsService";

// Opens when a collection is clicked: the games the user is playing that are not in the collection yet,
// each with an Add button. A game that was added leaves the list.
export default function CollectionGamesDialog({ collection, onAddGame, onClose }: ICollectionGamesDialog) {
  // null while the games are loading
  const playingGames = useLoadData(getPlayingGames);

  const addedIds = collection.games.map((game) => game.id);
  const gamesToAdd = playingGames?.filter((game) => !addedIds.includes(game.id));

  return (
    <Dialog title={collection.name} onClose={onClose}>
      {(close) => (
        <>
          <p className="collection-games-intro">Games you are playing now that are not in this collection yet.</p>

          {gamesToAdd === undefined && <p className="collection-games-message">Loading your games...</p>}

          {gamesToAdd?.length === 0 && (
            <p className="collection-games-message">
              All the games you are playing are already in this collection.
            </p>
          )}

          {gamesToAdd && gamesToAdd.length > 0 && (
            <ul className="collection-games-list">
              {gamesToAdd.map((game) => (
                <li key={game.id}>
                  <img src={game.cover} alt="" draggable={false} />
                  <span>{game.title}</span>
                  <button
                    type="button"
                    className="collection-games-add"
                    aria-label={`Add ${game.title} to ${collection.name}`}
                    onClick={() => onAddGame(game)}
                  >
                    <IoAdd size={16} /> Add
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="dialog-actions">
            <button type="button" className="dialog-button dialog-button--main" onClick={close}>
              Done
            </button>
          </div>
        </>
      )}
    </Dialog>
  );
}

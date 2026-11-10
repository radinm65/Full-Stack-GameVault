import "./CollectionCard.css";

import { IoAdd, IoClose } from "react-icons/io5";

import ICollectionCard from "../../../core/interfaces/props/collections/ICollectionCard.props";

// The number of covers the card can show (2 rows of 4)
const COVER_SLOTS = 8;

// One collection: its name and a box with the covers of its games. Clicking the box (and only the box)
// opens the dialog to add games. The x in the top right corner deletes the collection.
export default function CollectionCard({ collection, onOpen, onDelete }: ICollectionCard) {
  return (
    <article className="collection-card">
      <h2>{collection.name}</h2>

      <button
        type="button"
        className="collection-delete"
        aria-label={`Delete ${collection.name}`}
        onClick={onDelete}
      >
        <IoClose size={20} />
      </button>

      <div className="collection-preview">
        {/* An invisible button over the whole box, so the box is one click target (and one tab stop) */}
        <button
          type="button"
          className="collection-open"
          aria-label={`Add games to ${collection.name}`}
          onClick={onOpen}
        />

        <ul className="collection-covers" aria-label={`${collection.games.length} games`}>
          {/* Every slot is drawn, so a collection with few games still shows the full box */}
          {Array.from({ length: COVER_SLOTS }, (_, index) => (
            <li key={index}>
              {collection.games[index] && <img src={collection.games[index].cover} alt="" loading="lazy" />}
            </li>
          ))}
        </ul>

        {/* Only for the look: the click is handled by the invisible button over the box */}
        <span className="collection-add-game" aria-hidden="true">
          <IoAdd size={38} />
        </span>
      </div>
    </article>
  );
}

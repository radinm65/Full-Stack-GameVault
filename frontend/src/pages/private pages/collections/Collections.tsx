import "./Collections.css";

import { useState } from "react";

import { IoAdd } from "react-icons/io5";

import CollectionCard from "../../../components/collections/collectionCard/CollectionCard";
import CollectionGamesDialog from "../../../components/collections/collectionGamesDialog/CollectionGamesDialog";
import CollectionNameDialog from "../../../components/collections/collectionNameDialog/CollectionNameDialog";
import GamesEmpty from "../../../components/games/gamesEmpty/GamesEmpty";
import GamesHeader from "../../../components/games/gamesHeader/GamesHeader";
import GamesSearchBar from "../../../components/games/gamesSearchBar/GamesSearchBar";

import useDelayedInput from "../../../hooks/useDelayedInput";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useUrlFilters from "../../../hooks/useUrlFilters";
import type ICollection from "../../../core/interfaces/models/collections/ICollection";
import type { ICollectionGame } from "../../../core/interfaces/models/collections/ICollection";
import {
  addGameToCollection,
  createCollection,
  deleteCollection,
  getCollections,
} from "../../../services/collectionsService";

// The URL query string is the whole state of this page: /collections?q=shoot
const defaults = {
  q: "",
};

export default function Collections() {
  const { filters, queryString, setFilter, clearFilters } = useUrlFilters(defaults);

  // The search box shows every keystroke, but the URL (and the server) only hear about it
  // once the user stops typing
  const [searchText, setSearchText] = useDelayedInput(filters.q, (text) => setFilter("q", text));

  // Searching and paging happen on the server, this page only sends the query string.
  // The next page of collections is requested when the sentinel below the grid scrolls into view.
  const { items: loadedCollections, hasMore, sentinelRef } = useInfiniteScroll(
    getCollections,
    queryString,
  );

  // What the user changed on this page. The loaded list is not edited, the changes are laid over it:
  // the collections they created, the ones they deleted and the games they added.
  // ! With the real API, reload the list (or edit it) after each change instead of keeping this here.
  const [createdCollections, setCreatedCollections] = useState<ICollection[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [addedGames, setAddedGames] = useState<Record<number, ICollectionGame[]>>({});

  // Which box is open: the one asking for a name, or the one to add games to a collection (its id)
  const [isNaming, setIsNaming] = useState(false);
  const [openCollectionId, setOpenCollectionId] = useState<number | null>(null);

  // The list on screen: new collections first, without the deleted ones, with the added games
  const collections = [...createdCollections, ...(loadedCollections ?? [])]
    .filter((collection) => !deletedIds.includes(collection.id))
    .map((collection) => ({
      ...collection,
      games: [...collection.games, ...(addedGames[collection.id] ?? [])],
    }));

  const openCollection = collections.find((collection) => collection.id === openCollectionId);

  const addCollection = async (name: string) => {
    const collection = await createCollection(name);
    setCreatedCollections((current) => [collection, ...current]);
  };

  const removeCollection = async (collectionId: number) => {
    await deleteCollection(collectionId);
    setDeletedIds((current) => [...current, collectionId]);
  };

  const addGame = async (collectionId: number, game: ICollectionGame) => {
    await addGameToCollection(collectionId, game.id);
    setAddedGames((current) => ({
      ...current,
      [collectionId]: [...(current[collectionId] ?? []), game],
    }));
  };

  return (
    <div className="collections-page">
      <GamesHeader title="Collections" subtitle="Every Collection Tells a Story." />

      <GamesSearchBar
        placeholder="Search Collection Names"
        query={searchText}
        onQueryChange={setSearchText}
        action={
          <button type="button" className="collections-add" onClick={() => setIsNaming(true)}>
            Add Collection <IoAdd size={20} />
          </button>
        }
      />

      {loadedCollections !== null && collections.length === 0 && (
        <GamesEmpty message="No collections match your search." onReset={() => clearFilters()} />
      )}

      <div className="collections-grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onOpen={() => setOpenCollectionId(collection.id)}
            onDelete={() => removeCollection(collection.id)}
          />
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} className="collections-sentinel" />}

      {isNaming && <CollectionNameDialog onCreate={addCollection} onClose={() => setIsNaming(false)} />}

      {openCollection && (
        <CollectionGamesDialog
          collection={openCollection}
          onAddGame={(game) => addGame(openCollection.id, game)}
          onClose={() => setOpenCollectionId(null)}
        />
      )}
    </div>
  );
}

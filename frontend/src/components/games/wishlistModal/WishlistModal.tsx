import "./WishlistModal.css";

import { useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";

import LibraryGameCard from "../libraryGameCard/LibraryGameCard";
import IWishlistModal from "../../../core/interfaces/props/games/IWishlistModal.props";
import useLoadData from "../../../hooks/useLoadData";
import { getWishlistGames } from "../../../services/libraryService";

// Mounted only while open. A native <dialog> gives the focus trap, Escape and the backdrop.
export default function WishlistModal({ onClose }: IWishlistModal) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const games = useLoadData(getWishlistGames);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="wishlist-modal"
      aria-labelledby="wishlist-modal-title"
      onClose={onClose}
      // The backdrop is part of the dialog, so a click that lands on the dialog itself is outside the panel
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="wishlist-modal-panel">
        <header className="wishlist-modal-header">
          <div>
            <h2 id="wishlist-modal-title">Wishlist</h2>
            {games && (
              <p>{games.length === 1 ? "1 game" : `${games.length} games`} you want to play</p>
            )}
          </div>

          <button type="button" className="wishlist-modal-close" aria-label="Close wishlist" onClick={onClose}>
            <IoClose size={22} />
          </button>
        </header>

        <div className="wishlist-modal-body">
          {games && games.length === 0 && (
            <p className="wishlist-modal-empty">Your wishlist is empty.</p>
          )}

          {games && games.length > 0 && (
            <div className="wishlist-modal-grid">
              {games.map((game) => (
                <LibraryGameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

import "./GameModal.css";

import { useEffect, useRef, useState } from "react";

import { FiArrowUpRight } from "react-icons/fi";
import {
  IoCheckmark,
  IoClose,
  IoCopyOutline,
  IoHeart,
  IoHeartOutline,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";

import AchievementBadge from "../achievementBadge/AchievementBadge";
import LibraryGameCard from "../libraryGameCard/LibraryGameCard";
import ProgressBar from "../../progressBar/ProgressBar";
import IGameModal from "../../../core/interfaces/props/games/IGameModal.props";
import useLoadData from "../../../hooks/useLoadData";
import { getGameDetails } from "../../../services/gameDetailsService";
import { statusLabels, timeAgo } from "../../../utils/gameStatus";

// How long the closing animation runs. Keep in sync with game-modal-out in GameModal.css.
const CLOSE_DURATION = 250;

// Five stars: full, half or empty, depending on the value (4.7 shows 4 full and a half)
function Stars({ value, size }: { value: number; size: number }) {
  return (
    <span className="game-modal-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const Icon = value >= star ? IoStar : value >= star - 0.5 ? IoStarHalf : IoStarOutline;
        return <Icon key={star} size={size} aria-hidden="true" />;
      })}
    </span>
  );
}

// TODO: save the heart to the wishlist through the API
function HeartButton() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      type="button"
      className="game-modal-icon-button"
      aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isSaved}
      onClick={() => setIsSaved(!isSaved)}
    >
      {isSaved ? <IoHeart size={34} /> : <IoHeartOutline size={34} />}
    </button>
  );
}

// Copies the link of this modal, so the game can be shared
function CopyLinkButton() {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className="game-modal-icon-button"
      aria-label={isCopied ? "Link copied" : "Copy link to this game"}
      onClick={copyLink}
    >
      {isCopied ? <IoCheckmark size={34} /> : <IoCopyOutline size={34} />}
    </button>
  );
}

// Shown over the Games page while the URL has ?game=<id>. A native <dialog> gives the focus trap,
// Escape and the backdrop. The panel has a fixed height and its content scrolls, together with the
// blurred cover that fills the background.
// It opens and closes with an animation, so closing waits for it before telling the page (onClose).
export default function GameModal({ gameId, onClose }: IGameModal) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const [isClosing, setIsClosing] = useState(false);

  // null = still loading, undefined = no game has this id
  const game = useLoadData(getGameDetails, gameId);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first button (the close button), which would look selected.
      // Focus the dialog itself instead. Tab still moves to the buttons.
      dialog.focus();
    }
  }, []);

  // Leaving the page cancels a close that is still running
  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  const close = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimer.current = window.setTimeout(onClose, CLOSE_DURATION);
  };

  const isWishlisted = game?.status === "wishlisted";

  return (
    <dialog
      ref={dialogRef}
      className={`game-modal ${isClosing ? "game-modal--closing" : ""}`}
      aria-labelledby="game-modal-title"
      tabIndex={-1}
      // Escape: stop the browser from closing the dialog at once, close with the animation instead
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // The backdrop is part of the dialog, so a click that lands on the dialog itself is outside the panel
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button type="button" className="game-modal-close" aria-label="Close game details" onClick={close}>
        <IoClose size={22} />
      </button>

      {game === null && <p className="game-modal-message">Loading game...</p>}
      {game === undefined && (
        <h2 id="game-modal-title" className="game-modal-message">
          We could not find this game.
        </h2>
      )}

      {/* The background is as big as the panel and stays in place while the content scrolls over it */}
      {game && <img src={game.backdrop} alt="" className="game-modal-art" />}
      {game && <div className="game-modal-shade" />}

      {game && (
        // The key makes a new game (a related game was clicked) start at the top with a fresh fade
        <div className="game-modal-scroll" key={game.id}>
          <div className="game-modal-page">
            <div className="game-modal-content">
              <header className="game-modal-hero">
                <div className="game-modal-actions">
                  <HeartButton />
                  <CopyLinkButton />
                </div>

                <div className="game-modal-poster">
                  <img src={game.cover} alt="" draggable={false} />
                  {!isWishlisted && (
                    <>
                      <span className="game-modal-poster-value">{game.progress}%</span>
                      <ProgressBar value={game.progress} className="game-modal-poster-progress" />
                    </>
                  )}
                </div>

                <div className="game-modal-info">
                  <h2 id="game-modal-title">{game.title}</h2>
                  <p className="game-modal-publisher">{game.publisher}</p>
                  <p className="game-modal-year">{game.year}</p>
                  <p className="game-modal-rating">
                    {game.rating} <Stars value={game.rating} size={22} />
                  </p>

                  {!isWishlisted && (
                    <div className="game-modal-play">
                      {/* TODO: launch the game */}
                      <button type="button" className="game-modal-start">
                        Start Game <FiArrowUpRight />
                      </button>
                      <p>Played {game.hoursPlayed}h</p>
                      <p className="game-modal-last-played">
                        {game.lastPlayedAt ? `Last played ${timeAgo(game.lastPlayedAt)}` : "Not played yet"}
                      </p>
                    </div>
                  )}
                </div>

                <span className={`game-modal-status game-modal-status--${game.status}`}>
                  {statusLabels[game.status]}
                </span>
              </header>

              <section className="game-modal-section game-modal-section--gameplay" aria-labelledby="game-modal-gameplay">
                <h3 id="game-modal-gameplay">Game Play</h3>
                <div className="game-modal-screenshots">
                  {game.screenshots.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${game.title} screenshot ${index + 1}`}
                      loading="lazy"
                      draggable={false}
                    />
                  ))}
                </div>
              </section>

              <section className="game-modal-section game-modal-section--details" aria-labelledby="game-modal-details">
                <h3 id="game-modal-details">Description &amp; Details</h3>
                <p className="game-modal-description">{game.description}</p>

                <div className="game-modal-facts">
                  <p>
                    <strong>{game.genre}</strong>
                    <span>Genre</span>
                  </p>
                  <p>
                    <strong>{game.platform}</strong>
                    <span>Platform</span>
                  </p>
                  <p>
                    <strong>
                      {game.achievementsUnlocked}/{game.achievementsTotal}
                    </strong>
                    <span>Achievements</span>
                  </p>
                  <p>
                    <strong>{game.hoursToBeat} Hours</strong>
                    <span>Estimated Playtime</span>
                  </p>
                </div>
              </section>

              <section className="game-modal-section game-modal-section--ratings" aria-labelledby="game-modal-ratings">
                <h3 id="game-modal-ratings">Achievements &amp; Ratings</h3>

                <div className="game-modal-columns">
                  <div>
                    <h4>Achievements</h4>
                    <ProgressBar
                      value={Math.round((game.achievementsUnlocked / game.achievementsTotal) * 100)}
                      className="game-modal-achievements-bar"
                    />
                    <p className="game-modal-unlocked">
                      Unlocked {Math.round((game.achievementsUnlocked / game.achievementsTotal) * 100)}%
                    </p>

                    <ul className="game-modal-groups">
                      {game.achievementGroups.map((group) => (
                        <li key={group.id}>
                          <span>{group.label}</span>
                          <span>
                            {group.unlocked} / {group.total}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <ul className="game-modal-badges" aria-label="Achievement badges">
                      {game.achievements.map((achievement) => (
                        <li key={achievement.id}>
                          <AchievementBadge achievement={achievement} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Ratings</h4>
                    <div className="game-modal-score">
                      <strong>{game.rating}</strong>
                      <div>
                        <Stars value={game.rating} size={18} />
                        <p>Based on {game.ratingCount} Ratings</p>
                      </div>
                    </div>

                    <ul className="game-modal-bars">
                      {game.ratingBars.map((bar) => (
                        <li key={bar.stars}>
                          <span>{bar.stars}</span>
                          <ProgressBar value={bar.percent} className="game-modal-bar" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="game-modal-section game-modal-section--reviews" aria-labelledby="game-modal-reviews">
                <div className="game-modal-section-heading">
                  <h3 id="game-modal-reviews">Reviews</h3>
                  {/* TODO: open the review form */}
                  <button type="button" className="game-modal-add-review">
                    Add Review +
                  </button>
                </div>

                <div className="game-modal-reviews">
                  {game.reviews.map((review) => (
                    <article key={review.id} className="game-modal-review">
                      <span className="game-modal-avatar" aria-hidden="true">
                        {review.author[0]}
                      </span>
                      <div className="game-modal-review-author">
                        <p>
                          <strong>{review.author}</strong>
                          <span>Posted {review.postedAgo}</span>
                        </p>
                        <Stars value={review.stars} size={18} />
                      </div>
                      <p className="game-modal-review-text">{review.text}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="game-modal-section game-modal-section--related" aria-labelledby="game-modal-related">
                <h3 id="game-modal-related">Related Games</h3>
                <div className="game-modal-related">
                  {game.related.map((relatedGame) => (
                    <LibraryGameCard key={relatedGame.id} game={relatedGame} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

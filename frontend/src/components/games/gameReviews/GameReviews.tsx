import { useState } from "react";

import ReviewForm from "../reviewForm/ReviewForm";
import StarRating from "../../starRating/StarRating";
import type { IGameReview } from "../../../core/interfaces/models/games/IGameDetails";
import IGameReviews from "../../../core/interfaces/props/games/IGameReviews.props";

// ! DUMMY DATA: the signed-in user, replace with GET /api/auth/me
const dummyUserName = "Nova";

// The content of the Reviews section of the game modal: the heading with "Add Review +", the review
// form when it is open, and the reviews. The section itself (and its title id) is in GameModal.tsx.
export default function GameReviews({ reviews }: IGameReviews) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Reviews written in this modal. They are shown at the top, right after submitting.
  const [myReviews, setMyReviews] = useState<IGameReview[]>([]);

  const handleSubmit = (stars: number, text: string) => {
    // TODO: send the review (POST /api/games/:gameId/reviews). Until then it is only kept here.
    setMyReviews([
      { id: Date.now(), author: dummyUserName, stars, postedAgo: "just now", text },
      ...myReviews,
    ]);
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="game-modal-section-heading">
        <h3 id="game-modal-reviews">Reviews</h3>
        <button
          type="button"
          className="game-modal-add-review"
          aria-expanded={isFormOpen}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          Add Review +
        </button>
      </div>

      {isFormOpen && <ReviewForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />}

      <div className="game-modal-reviews">
        {[...myReviews, ...reviews].map((review) => (
          <article key={review.id} className="game-modal-review">
            <span className="game-modal-avatar" aria-hidden="true">
              {review.author[0]}
            </span>
            <div className="game-modal-review-author">
              <p>
                <strong>{review.author}</strong>
                <span>Posted {review.postedAgo}</span>
              </p>
              <StarRating value={review.stars} size={18} className="game-modal-stars" />
            </div>
            <p className="game-modal-review-text">{review.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

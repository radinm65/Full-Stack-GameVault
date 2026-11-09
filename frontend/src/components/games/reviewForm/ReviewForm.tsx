import "./ReviewForm.css";

import { useState } from "react";
import type { FormEvent } from "react";

import { IoStar, IoStarOutline } from "react-icons/io5";

import IReviewForm from "../../../core/interfaces/props/games/IReviewForm.props";
import { MAX_REVIEW_WORDS, countWords } from "../../../utils/reviewText";

// The small box that opens under "Add Review +": a rating from 1 to 5 stars, the review text
// (up to 500 words) and the Submit and Cancel buttons.
export default function ReviewForm({ onSubmit, onCancel }: IReviewForm) {
  // 0 means no rating picked yet. A rating is always a whole number, there are no half stars.
  const [stars, setStars] = useState(0);
  // The star the mouse is over, so the stars light up before the click. 0 means none.
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState("");

  const wordCount = countWords(text);
  const isTooLong = wordCount > MAX_REVIEW_WORDS;
  const canSubmit = stars > 0 && wordCount > 0 && !isTooLong;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) onSubmit(stars, text.trim());
  };

  const litStars = hoveredStar || stars;

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-rating">
        <p id="review-form-rating-label">Your rating</p>

        <div
          className="review-form-stars"
          role="radiogroup"
          aria-labelledby="review-form-rating-label"
          onMouseLeave={() => setHoveredStar(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={stars === star}
              aria-label={star === 1 ? "1 star" : `${star} stars`}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoveredStar(star)}
            >
              {star <= litStars ? <IoStar size={28} /> : <IoStarOutline size={28} />}
            </button>
          ))}
        </div>

        <span className="review-form-stars-value">{stars > 0 ? `${stars} / 5` : "Pick 1 to 5 stars"}</span>
      </div>

      <textarea
        rows={5}
        value={text}
        placeholder="Share what you think about this game..."
        aria-label="Your review"
        aria-invalid={isTooLong}
        autoFocus
        onChange={(e) => setText(e.target.value)}
      />

      <div className="review-form-footer">
        <span className={isTooLong ? "review-form-count review-form-count--over" : "review-form-count"}>
          {wordCount} / {MAX_REVIEW_WORDS} words
        </span>

        <div className="review-form-buttons">
          <button type="button" className="review-form-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="review-form-submit" disabled={!canSubmit}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

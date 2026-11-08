import "./CommunityShare.css";

import { useState } from "react";

import { IoTrophyOutline } from "react-icons/io5";

import StarRating from "../../starRating/StarRating";
import type { IShareChoice } from "../../../core/interfaces/models/community/IShareable";
import ICommunityShare from "../../../core/interfaces/props/community/ICommunityShare.props";
import useLoadData from "../../../hooks/useLoadData";
import { getShareables } from "../../../services/communityService";
import { formatDate } from "../../../utils/gameStatus";

// The part of the post box that opens when the user clicks POST. The user picks one of their
// unlocked achievements or one of their reviews, and shares it.
export default function CommunityShare({ onShare, onCancel }: ICommunityShare) {
  // null while it loads
  const shareables = useLoadData(getShareables);
  const [tab, setTab] = useState<IShareChoice["type"]>("achievement");
  const [choice, setChoice] = useState<IShareChoice | null>(null);

  // Each tab has its own list, so a choice made in one tab is dropped when the tab changes
  const changeTab = (next: IShareChoice["type"]) => {
    setTab(next);
    setChoice(null);
  };

  const isChosen = (id: number) => choice?.type === tab && choice.id === id;

  return (
    <div className="community-share-content">
      <p className="community-share-title">Choose what to share</p>

      <div className="community-share-tabs" role="tablist" aria-label="What to share">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "achievement"}
          onClick={() => changeTab("achievement")}
        >
          My achievements
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "review"}
          onClick={() => changeTab("review")}
        >
          My reviews
        </button>
      </div>

      <div className="community-share-list" role="radiogroup" aria-label="Your choice">
        {shareables === null && <p className="community-share-empty">Loading...</p>}

        {shareables && tab === "achievement" && shareables.achievements.length === 0 && (
          <p className="community-share-empty">You have not unlocked any achievements yet.</p>
        )}

        {shareables && tab === "review" && shareables.reviews.length === 0 && (
          <p className="community-share-empty">You have not written any reviews yet.</p>
        )}

        {shareables &&
          tab === "achievement" &&
          shareables.achievements.map((achievement) => (
            <label
              key={achievement.id}
              className={`share-option ${isChosen(achievement.id) ? "share-option--chosen" : ""}`}
            >
              <input
                type="radio"
                name="share-choice"
                checked={isChosen(achievement.id)}
                onChange={() => setChoice({ type: "achievement", id: achievement.id })}
              />
              <IoTrophyOutline size={26} aria-hidden="true" />
              <div>
                <p>{achievement.name}</p>
                <p className="share-option-meta">
                  {achievement.gameTitle} · Unlocked {formatDate(achievement.unlockDate)}
                </p>
              </div>
            </label>
          ))}

        {shareables &&
          tab === "review" &&
          shareables.reviews.map((review) => (
            <label
              key={review.id}
              className={`share-option ${isChosen(review.id) ? "share-option--chosen" : ""}`}
            >
              <input
                type="radio"
                name="share-choice"
                checked={isChosen(review.id)}
                onChange={() => setChoice({ type: "review", id: review.id })}
              />
              <div>
                <p>
                  {review.gameTitle} <StarRating value={review.rating} size={14} />
                </p>
                <p className="share-option-meta share-option-text">{review.text}</p>
              </div>
            </label>
          ))}
      </div>

      <div className="community-share-actions">
        <button type="button" className="community-share-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="community-share-submit"
          disabled={choice === null}
          onClick={() => choice && onShare(choice)}
        >
          Share
        </button>
      </div>
    </div>
  );
}

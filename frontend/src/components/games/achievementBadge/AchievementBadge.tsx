import "./AchievementBadge.css";

import { useEffect, useId, useRef, useState } from "react";

import type { IconType } from "react-icons";
import { GiBattleAxe, GiCrossedSwords, GiCrownedSkull } from "react-icons/gi";

import type { AchievementIcon } from "../../../core/interfaces/models/games/IAchievement";
import IAchievementBadge from "../../../core/interfaces/props/games/IAchievementBadge.props";
import { formatDate } from "../../../utils/gameStatus";

const TOOLTIP_WIDTH = 290;
// The space between the badge and its tooltip
const TOOLTIP_GAP = 12;
// The least room the tooltip needs above the badge. With less, it opens below the badge instead.
const TOOLTIP_ROOM = 240;

const icons: Record<AchievementIcon, IconType> = {
  skull: GiCrownedSkull,
  swords: GiCrossedSwords,
  axe: GiBattleAxe,
};

const categoryLabels = {
  playtime: "Playtime",
  completion: "Completion",
  milestones: "Milestones",
};

// Where the tooltip is drawn on the screen
interface TooltipPlace {
  left: number;
  top: number;
  isAbove: boolean;
}

// A round achievement badge. Hovering it (or focusing it with the keyboard) shows a small card with
// everything about the achievement: icon, name, description, category, unlock condition, status
// and, for unlocked ones, the unlock date.
//
// The tooltip uses position: fixed, so the scrolling area of the game modal cannot cut it off.
// The place is measured from the badge each time it opens.
export default function AchievementBadge({ achievement }: IAchievementBadge) {
  const badgeRef = useRef<HTMLButtonElement>(null);
  const tooltipId = useId();
  const [place, setPlace] = useState<TooltipPlace | null>(null);

  const Icon = icons[achievement.icon];

  const showTooltip = () => {
    const badge = badgeRef.current;
    if (!badge) return;

    const box = badge.getBoundingClientRect();
    const isAbove = box.top > TOOLTIP_ROOM;

    // Centered on the badge, but never outside the game modal (or the screen, if there is no modal)
    const area = badge.closest("dialog")?.getBoundingClientRect();
    const minLeft = (area?.left ?? 0) + 12;
    const maxLeft = (area?.right ?? window.innerWidth) - TOOLTIP_WIDTH - 12;
    const centered = box.left + box.width / 2 - TOOLTIP_WIDTH / 2;
    const left = Math.min(Math.max(centered, minLeft), maxLeft);

    setPlace({
      left,
      top: isAbove ? box.top - TOOLTIP_GAP : box.bottom + TOOLTIP_GAP,
      isAbove,
    });
  };

  const hideTooltip = () => setPlace(null);

  // The modal can scroll while the tooltip is open, and a fixed tooltip would stay behind. Hide it then.
  useEffect(() => {
    if (!place) return;

    window.addEventListener("scroll", hideTooltip, true);
    return () => window.removeEventListener("scroll", hideTooltip, true);
  }, [place]);

  return (
    <>
      <button
        ref={badgeRef}
        type="button"
        className={`achievement-badge ${achievement.isUnlocked ? "achievement-badge--unlocked" : ""}`}
        aria-label={`${achievement.name}, ${achievement.isUnlocked ? "unlocked" : "locked"}`}
        aria-describedby={place ? tooltipId : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        <Icon size={32} aria-hidden="true" />
      </button>

      {place && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`achievement-tooltip ${place.isAbove ? "achievement-tooltip--above" : ""}`}
          style={{ left: place.left, top: place.top, width: TOOLTIP_WIDTH }}
        >
          <div className="achievement-tooltip-head">
            <span
              className={`achievement-tooltip-icon ${achievement.isUnlocked ? "achievement-tooltip-icon--unlocked" : ""}`}
            >
              <Icon size={26} aria-hidden="true" />
            </span>
            <h4>{achievement.name}</h4>
          </div>

          <p className="achievement-tooltip-description">{achievement.description}</p>

          <dl className="achievement-tooltip-fields">
            <div>
              <dt>Category</dt>
              <dd>{categoryLabels[achievement.category]}</dd>
            </div>
            <div>
              <dt>Unlock Condition</dt>
              <dd>{achievement.unlockCondition}</dd>
            </div>
            <div>
              <dt>Unlock Status</dt>
              <dd className={achievement.isUnlocked ? "achievement-status--unlocked" : ""}>
                {achievement.isUnlocked ? "Unlocked" : "Locked"}
              </dd>
            </div>
            {achievement.isUnlocked && achievement.unlockDate && (
              <div>
                <dt>Unlock Date</dt>
                <dd>{formatDate(achievement.unlockDate)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </>
  );
}

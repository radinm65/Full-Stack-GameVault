import "./ProfileAchievementCard.css";

import type { IconType } from "react-icons";
import { GiCrossedSwords } from "react-icons/gi";
import { IoSparklesOutline, IoTrophyOutline } from "react-icons/io5";

import type { ProfileAchievementIcon } from "../../../core/interfaces/models/profile/IProfile";
import IProfileAchievementCard from "../../../core/interfaces/props/profile/IProfileAchievementCard.props";

const icons: Record<ProfileAchievementIcon, IconType> = {
  trophy: IoTrophyOutline,
  sparkle: IoSparklesOutline,
  swords: GiCrossedSwords,
};

export default function ProfileAchievementCard({ achievement }: IProfileAchievementCard) {
  const Icon = icons[achievement.icon];

  return (
    <article className="profile-achievement">
      <span className="profile-achievement-icon">
        <Icon size={24} aria-hidden="true" />
      </span>

      <h3>{achievement.title}</h3>
      <p className="profile-achievement-game">{achievement.game}</p>
      <p className="profile-achievement-detail">{achievement.detail}</p>
    </article>
  );
}

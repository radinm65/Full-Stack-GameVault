import "./ProfileFavoriteCard.css";

import { IoCheckmarkCircleOutline, IoStarOutline } from "react-icons/io5";

import GameLink from "../../games/gameLink/GameLink";
import IProfileFavoriteCard from "../../../core/interfaces/props/profile/IProfileFavoriteCard.props";

// A favorite game: the cover, the title and a few numbers. A click opens the game modal like any game card.
export default function ProfileFavoriteCard({ game }: IProfileFavoriteCard) {
  return (
    <GameLink gameId={game.id} className="profile-favorite">
      <img src={game.cover} alt="" className="profile-favorite-cover" draggable={false} />

      <div className="profile-favorite-body">
        <h3>{game.title}</h3>
        <span className="profile-favorite-genre">{game.genre}</span>

        <div className="profile-favorite-row">
          <p className="profile-favorite-rating">
            <IoStarOutline size={18} aria-hidden="true" />
            {game.rating.toFixed(1)}
          </p>
          <p className="profile-favorite-hours">
            <IoCheckmarkCircleOutline size={24} aria-hidden="true" />
            <strong>{game.hoursPlayed}</strong> Hours
          </p>
        </div>

        <div className="profile-favorite-row profile-favorite-meta">
          <p>
            {game.year} • {game.developer} • {game.platform}
          </p>
          <p>{game.achievementsUnlocked} Achievements</p>
        </div>
      </div>
    </GameLink>
  );
}

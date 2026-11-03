import "./LibraryGameCard.css";

import { IoTrophyOutline } from "react-icons/io5";

import ProgressBar from "../../progressBar/ProgressBar";
import GameLink from "../gameLink/GameLink";
import ILibraryGameCard from "../../../core/interfaces/props/games/ILibraryGameCard.props";
import { statusLabels } from "../../../utils/gameStatus";

export default function LibraryGameCard({ game }: ILibraryGameCard) {
  const isWishlisted = game.status === "wishlisted";

  return (
    <GameLink gameId={game.id} className={`library-card library-card--${game.status}`}>
      <img src={game.cover} alt="" className="library-card-cover" draggable={false} />

      <span className="library-card-status">{statusLabels[game.status]}</span>

      <div className="library-card-body">
        <h3>{game.title}</h3>

        <div className="library-card-footer">
          <div className="library-card-details">
            <p className="library-card-achievements">
              <IoTrophyOutline size={20} aria-hidden="true" />
              {isWishlisted
                ? game.achievementsTotal
                : `${game.achievementsUnlocked} / ${game.achievementsTotal}`}
            </p>
            <p className="library-card-meta">
              {isWishlisted
                ? `${game.genre} · ${game.platform} · ${game.hoursToBeat}h Playtime`
                : `${game.platform} · ${game.hoursPlayed}h played`}
            </p>
          </div>

          {!isWishlisted && <span className="library-card-progress-value">{game.progress}%</span>}
        </div>
      </div>

      {!isWishlisted && <ProgressBar value={game.progress} className="library-card-progress" />}
    </GameLink>
  );
}

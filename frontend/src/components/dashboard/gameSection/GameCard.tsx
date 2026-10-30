import "./GameCard.css";

import { IoStarOutline } from "react-icons/io5";

import ProgressBar from "../../progressBar/ProgressBar";
import IGameCard from "../../../core/interfaces/props/dashboard/IGameCard.props";

export default function GameCard({ game, variant }: IGameCard) {
  return (
    <article className={`game-card game-card--${variant}`}>
      <img src={game.cover} alt="" className="game-card-cover" draggable={false} />

      <div className="game-card-body">
        <div className="game-card-heading">
          <h3>{game.title}</h3>
          <p>
            {game.publisher} · {game.year}
          </p>
        </div>

        <div className="game-card-tags">
          <span className={`game-card-genre game-card-genre--${game.genre.toLowerCase()}`}>
            {game.genre}
          </span>
          <span className="game-card-rating">
            <IoStarOutline size={15} /> {game.rating}
          </span>
          {variant === "wishlist" && (
            <span className="game-card-price">{game.price} $</span>
          )}
        </div>

        {variant === "progress" && (
          <>
            <p className="game-card-stats">
              {game.progress}% game progress · {game.hoursPlayed}h played ·{" "}
              {game.achievementsUnlocked}/{game.achievementsTotal} achievements
            </p>
            <ProgressBar value={game.progress} />
          </>
        )}
      </div>
    </article>
  );
}

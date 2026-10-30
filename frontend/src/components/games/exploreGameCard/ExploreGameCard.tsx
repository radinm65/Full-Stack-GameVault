import "./ExploreGameCard.css";

import { IoFlame, IoStarOutline } from "react-icons/io5";
import { LuClock2 } from "react-icons/lu";

import IExploreGameCard from "../../../core/interfaces/props/games/IExploreGameCard.props";

export default function ExploreGameCard({ game }: IExploreGameCard) {
  return (
    // TODO: link the card to the Game Details route (/games/:gameId)
    <article className={`explore-card ${game.trending ? "explore-card--trending" : ""}`}>
      <img src={game.cover} alt="" className="explore-card-cover" draggable={false} />

      {game.trending && (
        <span className="explore-card-trending">
          <span className="explore-card-trending-icon">
            <IoFlame size={16} />
          </span>
          Trending
        </span>
      )}

      <div className="explore-card-body">
        <h3>{game.title}</h3>
        {game.trending && (
          <p className="explore-card-publisher">
            {game.publisher} · {game.year}
          </p>
        )}

        <span className={`explore-card-genre explore-card-genre--${game.genre.toLowerCase()}`}>
          {game.genre}
        </span>

        <span className="explore-card-rating">
          <IoStarOutline size={16} /> {game.rating}
        </span>
        <p className="explore-card-hours">
          <LuClock2/>
          <strong>{game.hoursToBeat}</strong> Hours
        </p>

        <p className="explore-card-meta">
          {game.year} • {game.setting} • {game.platform}
        </p>
        <p className="explore-card-achievements">{game.achievements} Achievements</p>
      </div>
    </article>
  );
}

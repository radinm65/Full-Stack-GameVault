import "./GameProgressPanel.css";

import { useState } from "react";

import HomeSliderPagination from "../../pagintation/Pagintation";
import useDragCarousel from "../../../hooks/useDragCarousel";
import IGameProgressPanel from "../../../core/interfaces/props/dashboard/IGameProgressPanel.props";

export default function GameProgressPanel({ games }: IGameProgressPanel) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { carouselRef, isDragging, trackStyle, trackHandlers } =
    useDragCarousel(games.length, currentSlide, setCurrentSlide);

  return (
    <section className="progress-panel" ref={carouselRef} aria-label="Game progress">
      <div
        className={`progress-panel-track${isDragging ? " dragging" : ""}`}
        style={trackStyle}
        {...trackHandlers}
      >
        {games.map((game) => {
          const stats = [
            { label: "Progress", value: `${game.progress}%` },
            { label: "Play Time", value: game.playTime },
            { label: "Achievements", value: game.achievements },
            { label: "Game Status", value: game.status },
            { label: "Last Played", value: game.lastPlayed },
          ];

          return (
            <div className="progress-panel-slide" key={game.id} aria-label={game.title}>
              <img
                src={game.image}
                alt=""
                className="progress-panel-image"
                draggable={false}
              />

              <div className="progress-panel-stats">
                {stats.map((stat) => (
                  <div className="progress-panel-stat" key={stat.label}>
                    <p className="progress-panel-value">{stat.value}</p>
                    <p className="progress-panel-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="progress-panel-dots">
        <HomeSliderPagination
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          count={games.length}
        />
      </div>
    </section>
  );
}

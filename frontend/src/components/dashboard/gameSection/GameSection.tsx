import "./GameSection.css";

import { useEffect, useRef } from "react";

import GameCard from "./GameCard";
import SectionHeader from "../../sectionHeader/SectionHeader";
import IGameSection from "../../../core/interfaces/props/dashboard/IGameSection.props";

export default function GameSection({
  title,
  linkText,
  linkTo,
  games,
  variant = "progress",
}: IGameSection) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Fade the right edge only while there are more cards to scroll to
  const updateFade = () => {
    const row = rowRef.current;
    if (!row) return;

    const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
    row.classList.toggle("game-row--at-end", atEnd);
  };

  useEffect(updateFade, [games]);

  return (
    <section className="game-section">
      <SectionHeader title={title} linkText={linkText} linkTo={linkTo} />
      <div className="game-row" ref={rowRef} onScroll={updateFade}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} variant={variant} />
        ))}
      </div>
    </section>
  );
}

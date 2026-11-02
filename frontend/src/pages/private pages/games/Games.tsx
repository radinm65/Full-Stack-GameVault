import "./Games.css";

import { useSearchParams } from "react-router";

import GameModal from "../../../components/games/gameModal/GameModal";
import ExploreTab from "./explore/ExploreTab";
import LibraryTab from "./library/LibraryTab";

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLibrary = searchParams.get("tab") === "library";

  // Clicking any game card adds ?game=<id> to the URL, which opens the modal over the current tab
  const gameId = searchParams.get("game");

  const closeGame = () => {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("game");
        return nextParams;
      },
      { replace: true },
    );
  };

  return (
    <>
      {/* The key makes the tab fade in again each time the user switches between Explore and Library */}
      <div key={isLibrary ? "library" : "explore"} className="games-page games-tab-transition">
        {isLibrary ? <LibraryTab /> : <ExploreTab />}
      </div>

      {gameId !== null && <GameModal gameId={gameId} onClose={closeGame} />}
    </>
  );
}

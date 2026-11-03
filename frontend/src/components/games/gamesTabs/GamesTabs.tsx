import "./GamesTabs.css";

import { useSearchParams } from "react-router";

import GamesTab from "../../../core/interfaces/models/games/GamesTab";
import IGamesTabs from "../../../core/interfaces/props/games/IGamesTabs.props";

const tabs: { id: GamesTab; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "library", label: "Library" },
];

export default function GamesTabs({ active }: IGamesTabs) {
  const [, setSearchParams] = useSearchParams();

  // Each tab keeps its own filters, so switching starts from a clean query string
  const selectTab = (tab: GamesTab) => {
    if (tab !== active) setSearchParams({ tab });
  };

  return (
    <div className="games-tabs" role="tablist" aria-label="Games views">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`games-tab ${active === tab.id ? "games-tab-active" : ""}`}
          onClick={() => selectTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

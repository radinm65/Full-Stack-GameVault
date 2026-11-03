import "./GameLink.css";

import { Link, useLocation } from "react-router";

import IGameLink from "../../../core/interfaces/props/games/IGameLink.props";

// A link that opens the game modal: /games?game=2
// Every game card is one of these, so a click on a card works the same everywhere.
//
// On the Games page the current tab and filters are kept (/games?tab=library&status=playing&game=2),
// so closing the modal brings the user back to the same list. From any other page (the dashboard)
// it goes to the Explore tab, which is what /games?game=2 opens.
export default function GameLink({ gameId, className = "", children }: IGameLink) {
  const { pathname, search } = useLocation();

  const params = new URLSearchParams(pathname === "/games" ? search : "");
  params.set("game", String(gameId));

  return (
    <Link
      to={{ pathname: "/games", search: params.toString() }}
      className={`game-link ${className}`}
      draggable={false}
    >
      {children}
    </Link>
  );
}

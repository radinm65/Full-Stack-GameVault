import "./GamesEmpty.css";

import IGamesEmpty from "../../../core/interfaces/props/games/IGamesEmpty.props";

export default function GamesEmpty({ message, onReset }: IGamesEmpty) {
  return (
    <div className="games-empty">
      <p>{message}</p>
      <button type="button" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}

import "./GamesHeader.css";

import IGamesHeader from "../../../core/interfaces/props/games/IGamesHeader.props";

export default function GamesHeader({
  title,
  subtitle,
  statusIcon: StatusIcon,
  statusText,
  action,
}: IGamesHeader) {
  return (
    <div className="games-header">
      <div className="games-header-text">
        <p className="games-header-eyebrow">YOUR PLAY. CONNECTED.</p>
        <h1>{title}</h1>
        <p className="games-header-subtitle">{subtitle}</p>
      </div>

      <div className="games-header-status">
        <p>
          <StatusIcon size={20} aria-hidden="true" />
          {statusText}
        </p>
        {action}
      </div>
    </div>
  );
}

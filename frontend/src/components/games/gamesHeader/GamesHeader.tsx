import "./GamesHeader.css";

import IGamesHeader from "../../../core/interfaces/props/games/IGamesHeader.props";

// The page title block of the private pages: eyebrow, title, subtitle and, when given, a status line
export default function GamesHeader({
  title,
  subtitle,
  statusIcon: StatusIcon,
  statusText,
  action,
}: IGamesHeader) {
  const hasStatus = StatusIcon !== undefined && statusText !== undefined;

  return (
    <div className="games-header">
      <div className="games-header-text">
        <p className="games-header-eyebrow">YOUR PLAY. CONNECTED.</p>
        <h1>{title}</h1>
        <p className="games-header-subtitle">{subtitle}</p>
      </div>

      {(hasStatus || action) && (
        <div className="games-header-status">
          {hasStatus && (
            <p>
              <StatusIcon size={20} aria-hidden="true" />
              {statusText}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}

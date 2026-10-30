import "./ProgressBar.css";

import IProgressBar from "../../core/interfaces/props/shared/IProgressBar.props";

export default function ProgressBar({ value, className = "" }: IProgressBar) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`progress-track ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

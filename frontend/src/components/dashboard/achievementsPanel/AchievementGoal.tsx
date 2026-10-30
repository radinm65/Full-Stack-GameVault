import { IoFlagOutline, IoTrophyOutline } from "react-icons/io5";

import ProgressBar from "../../progressBar/ProgressBar";
import IAchievementGoal from "../../../core/interfaces/models/dashboard/IAchievementGoal";

export default function AchievementGoal({
  title,
  description,
  current,
  total,
  unit,
  icon,
}: IAchievementGoal) {
  const Icon = icon === "trophy" ? IoTrophyOutline : IoFlagOutline;

  return (
    <div className="goal">
      <div className="goal-heading">
        <Icon size={26} className="goal-icon" />
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
      <ProgressBar value={(current / total) * 100} />
      <p className="goal-count">
        {current} / {total} {unit}
      </p>
    </div>
  );
}

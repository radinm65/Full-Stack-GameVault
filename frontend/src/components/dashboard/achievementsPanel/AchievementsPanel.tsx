import "./AchievementsPanel.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

import AchievementGoal from "./AchievementGoal";
import IAchievementsPanel from "../../../core/interfaces/props/dashboard/IAchievementsPanel.props";

export default function AchievementsPanel({ goals }: IAchievementsPanel) {
  return (
    <section className="goals-panel">
      <div className="goals-panel-header">
        <h2>YOUR ACHIEVEMENTS</h2>
        {/* TODO: point to the Game Details achievements section of the featured game */}
        <Link to="/games" className="goals-panel-link">
          Manage <FiArrowUpRight />
        </Link>
      </div>

      <div className="goals-panel-list">
        {goals.map((goal) => (
          <AchievementGoal key={goal.id} {...goal} />
        ))}
      </div>
    </section>
  );
}

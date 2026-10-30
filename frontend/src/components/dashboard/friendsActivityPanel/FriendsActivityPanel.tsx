import "./FriendsActivityPanel.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

import ActivityItem from "./ActivityItem";
import IFriendsActivityPanel from "../../../core/interfaces/props/dashboard/IFriendsActivityPanel.props";

export default function FriendsActivityPanel({
  statusActivities,
  achievementActivities,
  onlineCount,
}: IFriendsActivityPanel) {
  return (
    <section className="friends-panel">
      <div className="friends-panel-header">
        <h2>FRIENDS' RECENT ACTIVITIES</h2>
        <Link to="/community" className="friends-panel-link">
          Community <FiArrowUpRight />
        </Link>
      </div>

      <div className="friends-panel-columns">
        <div className="friends-panel-column">
          <h3>Game Status &amp; Reviews</h3>
          <ul>
            {statusActivities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </ul>
        </div>

        <div className="friends-panel-column">
          <h3>Achievements</h3>
          <ul>
            {achievementActivities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </ul>
        </div>
      </div>

      <p className="friends-panel-online">
        <span /> {onlineCount} friends online
      </p>
    </section>
  );
}

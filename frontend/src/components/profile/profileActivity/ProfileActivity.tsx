import "./ProfileActivity.css";

import IProfileActivityList from "../../../core/interfaces/props/profile/IProfileActivity.props";

// The recent things the player did, newest first
export default function ProfileActivity({ activities }: IProfileActivityList) {
  return (
    <ul className="profile-activity">
      {activities.map((activity) => (
        <li key={activity.id} className="profile-activity-item">
          <h3>{activity.title}</h3>
          <p>{activity.detail}</p>
        </li>
      ))}
    </ul>
  );
}

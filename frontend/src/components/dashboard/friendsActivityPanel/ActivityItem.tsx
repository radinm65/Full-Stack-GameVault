import IFriendActivity from "../../../core/interfaces/models/dashboard/IFriendActivity";

export default function ActivityItem({ initial, title, detail }: IFriendActivity) {
  return (
    <li className="activity-item">
      <span className="activity-item-avatar">{initial}</span>
      <div>
        <h4>{title}</h4>
        <p>{detail}</p>
      </div>
    </li>
  );
}

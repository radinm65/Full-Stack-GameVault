import type IFriendActivity from "../../models/dashboard/IFriendActivity";

interface IFriendsActivityPanel {
  statusActivities: IFriendActivity[];
  achievementActivities: IFriendActivity[];
  onlineCount: number;
}

export default IFriendsActivityPanel;

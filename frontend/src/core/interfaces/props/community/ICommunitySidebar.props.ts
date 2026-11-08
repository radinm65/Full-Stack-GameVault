import type IOnlineFriend from "../../models/community/IOnlineFriend";

interface ICommunitySidebar {
  // null while the friends are loading
  friends: IOnlineFriend[] | null;
  // How many messages the user has not read. null while it loads.
  unreadMessages: number | null;
}

export default ICommunitySidebar;

import type IChatRequest from "../../models/community/IChatRequest";
import type IOnlineFriend from "../../models/community/IOnlineFriend";

interface ICommunitySidebar {
  // null while the friends are loading
  friends: IOnlineFriend[] | null;
  // How many messages the user has not read. null while it loads.
  unreadMessages: number | null;
  // Set when a chat should open in the message card (null = nothing asked yet)
  chatRequest: IChatRequest | null;
}

export default ICommunitySidebar;

import type IConversation from "../../models/community/IConversation";

interface ICommunityConversations {
  onSelect: (conversation: IConversation) => void;
}

export default ICommunityConversations;

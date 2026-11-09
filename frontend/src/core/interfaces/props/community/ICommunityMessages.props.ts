import type IChatRequest from "../../models/community/IChatRequest";

interface ICommunityMessages {
  // How many messages the user has not read. null while it loads.
  unreadMessages: number | null;
  // Set when the page wants a chat to open (null = nothing asked yet)
  chatRequest: IChatRequest | null;
}

export default ICommunityMessages;

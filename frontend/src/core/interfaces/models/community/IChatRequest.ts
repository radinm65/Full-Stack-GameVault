import type IConversation from "./IConversation";

// "Open the chat with this person" (for example from the menu of a post). It is an object, not just
// the friend, so asking for the same friend twice is a new request each time.
interface IChatRequest {
  conversation: IConversation;
}

export default IChatRequest;

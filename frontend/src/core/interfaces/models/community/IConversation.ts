// One row of the message list: a friend the user can talk to
interface IConversation {
  id: string;
  name: string;
  // The username used in the address of their profile: /profile/<handle>
  handle: string;
  initial: string;
  // The last message of the conversation, shown under the name
  lastMessage: string;
  isOnline: boolean;
}

export default IConversation;

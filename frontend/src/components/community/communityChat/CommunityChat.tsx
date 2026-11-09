import "./CommunityChat.css";

import { IoPaperPlane } from "react-icons/io5";
import { Link } from "react-router";

import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import ICommunityChat from "../../../core/interfaces/props/community/ICommunityChat.props";

// ! DESIGN ONLY: these messages are fixed text so the chat can be seen. There is no loading,
// ! sending or saving of messages yet. When the chat is built, the messages come from the API.
const sampleMessages = [
  { id: 1, text: "lorem ipsum lorem ipsum lorem ipsum", isMine: false },
  { id: 2, text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", isMine: true },
  { id: 3, text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum", isMine: false },
  { id: 4, text: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", isMine: true },
  { id: 5, text: "lorem ipsum lorem ipsum", isMine: false },
];

// What one conversation looks like: the friend on top, the messages in the middle and the box to
// write in at the bottom. Nothing in it works yet, it only shows the design.
export default function CommunityChat({ conversation }: ICommunityChat) {
  return (
    <div className="chat">
      <div className="chat-messages">
        {/* Stays at the top while the messages scroll under it. Clicking it opens their profile. */}
        <Link
          to={`/profile/${conversation.handle}`}
          className="chat-friend"
          aria-label={`Open the profile of ${conversation.name}`}
        >
          <span className="chat-friend-avatar">
            <CommunityAvatar initial={conversation.initial} size={44} />
            {conversation.isOnline && <span className="chat-online-dot" aria-hidden="true" />}
          </span>
          <div>
            <p>{conversation.name}</p>
            <p>Last seen 24m ago</p>
          </div>
        </Link>

        {sampleMessages.map((message) => (
          <p key={message.id} className={`chat-bubble ${message.isMine ? "chat-bubble--mine" : ""}`}>
            {message.text}
          </p>
        ))}
      </div>

      <div className="chat-form">
        <input type="text" placeholder="Enter Your Message" aria-label={`Message ${conversation.name}`} />
        <button type="button" aria-label="Send message">
          <IoPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}

import "./CommunityMessages.css";

import { useEffect, useRef, useState } from "react";

import { IoAdd, IoArrowUndo } from "react-icons/io5";

import CommunityChat from "../communityChat/CommunityChat";
import CommunityConversations from "../communityConversations/CommunityConversations";
import type IChatRequest from "../../../core/interfaces/models/community/IChatRequest";
import type IConversation from "../../../core/interfaces/models/community/IConversation";
import ICommunityMessages from "../../../core/interfaces/props/community/ICommunityMessages.props";

// The "Message Friends" card. The round button opens it downwards and shows the list of friends,
// clicking a friend shows the chat design. The button shows what it does next:
// + (open), x (close the card), back arrow (from the chat back to the list).
// The page can also open it on a chat by itself (`chatRequest`), e.g. from the menu of a post.
export default function CommunityMessages({ unreadMessages, chatRequest }: ICommunityMessages) {
  const [isOpen, setIsOpen] = useState(false);
  // The friends are requested the first time the card opens, not before
  const [hasOpened, setHasOpened] = useState(false);
  // The friend whose chat is shown. null = the list of friends is shown.
  const [chatWith, setChatWith] = useState<IConversation | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  // A new chat request: open the card on that friend's chat. This is set while rendering (not in an
  // effect), React then renders again straight away with the new state.
  const [handledRequest, setHandledRequest] = useState<IChatRequest | null>(null);
  if (chatRequest && chatRequest !== handledRequest) {
    setHandledRequest(chatRequest);
    setIsOpen(true);
    setHasOpened(true);
    setChatWith(chatRequest.conversation);
  }

  // The card can be far from the post that asked for the chat (above the feed on a phone), so show it
  useEffect(() => {
    if (chatRequest) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chatRequest]);

  const handleButton = () => {
    if (chatWith) {
      setChatWith(null);
      return;
    }
    setIsOpen(!isOpen);
    setHasOpened(true);
  };

  const buttonLabel = chatWith ? "Back to your friends" : isOpen ? "Close messages" : "Start a new message";

  return (
    <section className="sidebar-card messages-card" ref={cardRef}>
      <div className="messages-top">
        <div>
          <h2>Message Friends</h2>

          {/* The number of new messages, with a red dot that pulses to catch the eye */}
          {unreadMessages !== null && (
            <p className={`messages-text ${unreadMessages > 0 ? "messages-text--new" : ""}`}>
              {unreadMessages > 0 && <span className="messages-unread-dot" aria-hidden="true" />}
              {unreadMessages === 0
                ? "No new messages"
                : `${unreadMessages} new ${unreadMessages === 1 ? "message" : "messages"}`}
            </p>
          )}
        </div>

        <button
          type="button"
          className={`messages-toggle ${isOpen && !chatWith ? "messages-toggle--open" : ""}`}
          aria-label={buttonLabel}
          aria-expanded={isOpen}
          aria-controls="messages-panel"
          onClick={handleButton}
        >
          {/* `key` makes the back arrow pop in again every time it appears */}
          {chatWith ? <IoArrowUndo key="back" className="messages-back-icon" size={18} /> : <IoAdd key="plus" size={22} />}
        </button>
      </div>

      {/* The card grows downwards by animating the height from 0 to its content.
          `inert` keeps the hidden buttons out of the tab order. */}
      <div
        id="messages-panel"
        className={`messages-panel ${isOpen ? "messages-panel--open" : ""}`}
        inert={!isOpen}
      >
        <div className="messages-panel-inner">
          {/* The list stays mounted behind the chat, so the friends already loaded and its scroll
              place are still there when the user comes back */}
          <div hidden={chatWith !== null}>
            {hasOpened && <CommunityConversations onSelect={setChatWith} />}
          </div>
          {chatWith && <CommunityChat conversation={chatWith} />}
        </div>
      </div>
    </section>
  );
}

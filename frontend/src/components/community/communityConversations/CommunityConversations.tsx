import "./CommunityConversations.css";

import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import ICommunityConversations from "../../../core/interfaces/props/community/ICommunityConversations.props";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { getConversations } from "../../../services/communityService";

// The scrollable list of friends to message. The next friends are requested when the user
// scrolls to the bottom of the list (the same hook the feed uses, here inside a small scroll box).
export default function CommunityConversations({ onSelect }: ICommunityConversations) {
  const { items: conversations, hasMore, sentinelRef } = useInfiniteScroll(getConversations, "");

  return (
    <div className="conversations">
      <ul>
        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <button type="button" onClick={() => onSelect(conversation)}>
              <span className="conversation-avatar">
                <CommunityAvatar initial={conversation.initial} size={48} />
                {conversation.isOnline && <span className="conversation-online-dot" role="img" aria-label="Online" />}
              </span>
              <span className="conversation-text">
                <span className="conversation-name">{conversation.name}</span>
                <span className="conversation-last-message">{conversation.lastMessage}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={sentinelRef} className="conversations-loading">
          Loading more…
        </div>
      )}
    </div>
  );
}

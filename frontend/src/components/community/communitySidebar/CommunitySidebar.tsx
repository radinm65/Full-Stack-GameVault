import "./CommunitySidebar.css";

import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import CommunityMessages from "../communityMessages/CommunityMessages";
import ICommunitySidebar from "../../../core/interfaces/props/community/ICommunitySidebar.props";

// The three cards next to the feed (above it on a phone)
export default function CommunitySidebar({ friends, unreadMessages, chatRequest }: ICommunitySidebar) {
  return (
    <aside className="community-sidebar">
      <CommunityMessages unreadMessages={unreadMessages} chatRequest={chatRequest} />

      <section className="sidebar-card sidebar-card--friends">
        <h2>FRIENDS ONLINE</h2>

        <ul>
          {friends?.map((friend) => (
            <li key={friend.id}>
              <CommunityAvatar initial={friend.initial} size={32} />
              <div>
                <p>{friend.name}</p>
                <p>{friend.status}</p>
              </div>
              <span className="sidebar-online-dot" role="img" aria-label="Online" />
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar-card">
        <h2 className="sidebar-guide-title">GOOD GAMES. GOOD COMPANY.</h2>
        <p className="sidebar-card-text">
          {/* The design has a different text on desktop and on a phone, the CSS shows one of them */}
          <span className="sidebar-text-wide">
            Discover player reviews, celebrate achievements, and follow the people you play with.
          </span>
          <span className="sidebar-text-narrow">
            Keep it welcoming. Mark spoilers, credit artwork and celebrate each other’s progress.
          </span>
        </p>
      </section>
    </aside>
  );
}

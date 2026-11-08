import "./CommunitySidebar.css";

import { IoAdd } from "react-icons/io5";

import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import ICommunitySidebar from "../../../core/interfaces/props/community/ICommunitySidebar.props";

// The three cards next to the feed (above it on a phone)
export default function CommunitySidebar({ friends, unreadMessages }: ICommunitySidebar) {
  return (
    <aside className="community-sidebar">
      <section className="sidebar-card">
        <div className="sidebar-card-top">
          <h2>Message Friends</h2>
          {/* TODO: open the new message screen */}
          <button type="button" className="sidebar-new-message" aria-label="Start a new message">
            <IoAdd size={20} />
          </button>
        </div>

        {/* The number of new messages, with a red dot that pulses to catch the eye */}
        {unreadMessages !== null && (
          <p className={`sidebar-card-text sidebar-messages ${unreadMessages > 0 ? "sidebar-messages--new" : ""}`}>
            {unreadMessages > 0 && <span className="sidebar-unread-dot" aria-hidden="true" />}
            {unreadMessages === 0
              ? "No new messages"
              : `${unreadMessages} new ${unreadMessages === 1 ? "message" : "messages"}`}
          </p>
        )}
      </section>

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

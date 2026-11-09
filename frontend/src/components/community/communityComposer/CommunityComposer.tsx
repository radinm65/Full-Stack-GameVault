import "./CommunityComposer.css";

import { useState } from "react";

import { IoAdd } from "react-icons/io5";

import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import CommunityShare from "../communityShare/CommunityShare";
import type { IShareChoice } from "../../../core/interfaces/models/community/IShareable";
import ICommunityComposer from "../../../core/interfaces/props/community/ICommunityComposer.props";

// The box at the top of the feed. The text is an optional caption. Clicking POST makes the box grow,
// and the user picks one of their unlocked achievements or one of their reviews to share.
export default function CommunityComposer({ firstName, initial, onShare }: ICommunityComposer) {
  const [caption, setCaption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // The achievements and reviews are loaded the first time the box opens, not before
  const [hasOpened, setHasOpened] = useState(false);

  const togglePicker = () => {
    setIsOpen(!isOpen);
    setHasOpened(true);
  };

  const handleShare = (choice: IShareChoice) => {
    onShare(choice, caption);
    setCaption("");
    setIsOpen(false);
  };

  return (
    <div className="community-composer">
      <div className="community-composer-row">
        <CommunityAvatar initial={initial} />

        {/* A textarea, so the placeholder can wrap to a second line on a phone */}
        <textarea
          rows={1}
          value={caption}
          placeholder={`What’s happening in your world, ${firstName}?`}
          aria-label="Add a caption to your post"
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          type="button"
          className={`community-composer-post ${isOpen ? "community-composer-post--open" : ""}`}
          aria-expanded={isOpen}
          aria-controls="community-share"
          onClick={togglePicker}
        >
          POST <IoAdd size={20} />
        </button>
      </div>

      {/* The box grows by animating its height from 0 to its content. `inert` keeps the closed
          buttons out of the tab order. */}
      <div
        id="community-share"
        className={`community-share ${isOpen ? "community-share--open" : ""}`}
        inert={!isOpen}
      >
        <div className="community-share-inner">
          {hasOpened && <CommunityShare onShare={handleShare} onCancel={() => setIsOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

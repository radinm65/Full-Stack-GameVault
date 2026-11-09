import "./CommunityAvatar.css";

import ICommunityAvatar from "../../../core/interfaces/props/community/ICommunityAvatar.props";

// The round avatar with the first letter of a user's name
export default function CommunityAvatar({ initial, size = 40 }: ICommunityAvatar) {
  return (
    <span
      className="community-avatar"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

import "./ProfileHero.css";

import { IoPencilOutline } from "react-icons/io5";

import CommunityAvatar from "../../community/communityAvatar/CommunityAvatar";
import IProfileHero from "../../../core/interfaces/props/profile/IProfileHero.props";

// The profile card: banner, avatar, name, a few facts, the bio and (on your own profile) the edit button
export default function ProfileHero({ profile, onEdit }: IProfileHero) {
  return (
    <section className="profile-hero" aria-label={`${profile.name}'s profile`}>
      <div className="profile-banner">
        <img src={profile.banner} alt="" draggable={false} />
      </div>

      <div className="profile-info">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="" className="profile-avatar-image" draggable={false} />
          ) : (
            <CommunityAvatar initial={profile.initial} size={88} />
          )}
        </div>

        <h2 className="profile-name">{profile.name}</h2>

        <div className="profile-details">
          <p className="profile-meta">
            @{profile.handle} · Joined {profile.joinedAt} · {profile.friends} friends
          </p>
          <p className="profile-bio">{profile.bio}</p>
          <p className="profile-stats">
            <span>{profile.friends} friends</span>
            <span>{profile.following} following</span>
            <span>{profile.followers} followers</span>
          </p>
        </div>

        {profile.isOwn && (
          <button type="button" className="profile-edit" onClick={onEdit}>
            Edit Profile <IoPencilOutline size={18} />
          </button>
        )}
      </div>
    </section>
  );
}

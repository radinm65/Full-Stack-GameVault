import "./CommunityPostCard.css";

import { IoEllipsisHorizontal } from "react-icons/io5";

import StarRating from "../../starRating/StarRating";
import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import ICommunityPostCard from "../../../core/interfaces/props/community/ICommunityPostCard.props";

export default function CommunityPostCard({ post }: ICommunityPostCard) {
  return (
    <article className="post-card">
      <header className="post-card-header">
        <CommunityAvatar initial={post.author.initial} />

        <div className="post-card-author">
          <p>
            {post.author.name} / @{post.author.handle}
          </p>
          <p>
            {post.timeAgo} · {post.gameTitle}
          </p>
        </div>

        {/* TODO: open the post menu (report, hide, unfollow) */}
        <button type="button" className="post-card-menu" aria-label="Post options">
          <IoEllipsisHorizontal size={18} />
        </button>
      </header>

      {/* A review shows its rating (the number and five stars). Other posts show the red chip. */}
      {post.rating !== undefined ? (
        <p className="post-card-rating">
          {post.rating} <StarRating value={post.rating} size={18} />
        </p>
      ) : (
        <span className="post-card-tag">{post.tag}</span>
      )}
      <h2>{post.title}</h2>
      <p className="post-card-text">{post.text}</p>

      {post.image && <img src={post.image} alt="" className="post-card-image" loading="lazy" />}
    </article>
  );
}

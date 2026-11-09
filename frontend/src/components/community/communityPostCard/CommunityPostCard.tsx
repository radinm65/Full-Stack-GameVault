import "./CommunityPostCard.css";

import { useEffect, useRef, useState } from "react";

import { IoChatbubbleEllipses, IoEllipsisHorizontal } from "react-icons/io5";

import StarRating from "../../starRating/StarRating";
import CommunityAvatar from "../communityAvatar/CommunityAvatar";
import ICommunityPostCard from "../../../core/interfaces/props/community/ICommunityPostCard.props";

export default function CommunityPostCard({ post, onChat }: ICommunityPostCard) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // While the menu is open, a click anywhere else or the Escape key closes it
  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  const startChat = () => {
    setIsMenuOpen(false);
    onChat?.();
  };

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

        {/* The three dots open a small menu. For now it only has "Chat" (report, hide and unfollow can
            be added here later). */}
        {onChat && (
          <div className="post-card-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="post-card-menu"
              aria-label="Post options"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <IoEllipsisHorizontal size={18} />
            </button>

            {isMenuOpen && (
              <div className="post-card-menu-list" role="menu">
                <button type="button" role="menuitem" onClick={startChat}>
                  <IoChatbubbleEllipses size={16} />
                  Chat
                </button>
              </div>
            )}
          </div>
        )}
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

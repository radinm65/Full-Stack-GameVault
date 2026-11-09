import "./Community.css";

import { useState } from "react";

import CommunityComposer from "../../../components/community/communityComposer/CommunityComposer";
import CommunityPostCard from "../../../components/community/communityPostCard/CommunityPostCard";
import CommunitySidebar from "../../../components/community/communitySidebar/CommunitySidebar";
import FilterChips from "../../../components/filterChips/FilterChips";
import GamesEmpty from "../../../components/games/gamesEmpty/GamesEmpty";
import GamesHeader from "../../../components/games/gamesHeader/GamesHeader";
import GamesSearchBar from "../../../components/games/gamesSearchBar/GamesSearchBar";

import useDelayedInput from "../../../hooks/useDelayedInput";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useLoadData from "../../../hooks/useLoadData";
import useUrlFilters from "../../../hooks/useUrlFilters";
import type IChatRequest from "../../../core/interfaces/models/community/IChatRequest";
import type ICommunityPost from "../../../core/interfaces/models/community/ICommunityPost";
import type { IPostAuthor } from "../../../core/interfaces/models/community/ICommunityPost";
import type { IShareChoice } from "../../../core/interfaces/models/community/IShareable";
import {
  createCommunityPost,
  getCommunityPosts,
  getOnlineFriends,
  getUnreadMessageCount,
} from "../../../services/communityService";

// ! DUMMY DATA: signed-in user, replace with GET /api/auth/me
const dummyUser = { firstName: "Nova", handle: "novastrider", initial: "N" };

// The URL query string is the whole state of this page: /community?feed=reviews&q=kai
// Nothing selected (no feed in the URL) shows the people you follow.
const defaults = {
  q: "",
  feed: "",
};

const feedOptions = [
  { value: "activity", label: "My Activity" },
  { value: "following", label: "Following" },
  { value: "discover", label: "Discover" },
  { value: "reviews", label: "Reviews" },
];

export default function Community() {
  const { filters, queryString, setFilter, clearFilters } = useUrlFilters(defaults);

  // The search box shows every keystroke, but the URL (and the server) only hear about it
  // once the user stops typing
  const [searchText, setSearchText] = useDelayedInput(filters.q, (text) => setFilter("q", text));

  // Filtering and paging happen on the server, this page only sends the query string.
  // The next page of posts is requested when the sentinel below the feed scrolls into view.
  const { items: posts, hasMore, sentinelRef } = useInfiniteScroll(getCommunityPosts, queryString);

  const friends = useLoadData(getOnlineFriends);
  const unreadMessages = useLoadData(getUnreadMessageCount);

  // Posts the user just shared. They are shown at the top of the feed, whatever the filters are.
  const [newPosts, setNewPosts] = useState<ICommunityPost[]>([]);

  const sharePost = async (choice: IShareChoice, caption: string) => {
    const post = await createCommunityPost(choice, caption);
    setNewPosts((current) => [post, ...current]);
  };

  // "Chat" in the menu of a post: the message card opens on the chat with the author of that post
  const [chatRequest, setChatRequest] = useState<IChatRequest | null>(null);

  const startChat = (author: IPostAuthor) => {
    setChatRequest({
      conversation: {
        id: author.id,
        name: author.name,
        handle: author.handle,
        initial: author.initial,
        lastMessage: "",
        // ! DUMMY DATA: the server knows if they are online
        isOnline: true,
      },
    });
  };

  // Clicking the chip that is already selected unselects it
  const changeFeed = (next: string) => setFilter("feed", next === filters.feed ? "" : next);

  return (
    <div className="community-page">
      <GamesHeader
        title="COMMUNITY"
        subtitle={
          <>
            {/* The design has a different text on desktop and on a phone, the CSS shows one of them */}
            <span className="community-text-wide">The achievements. The conversations. The people.</span>
            <span className="community-text-narrow">
              The unlocks, the conversations, the people behind the play.
            </span>
          </>
        }
      />

      <div className="community-toolbar">
        <GamesSearchBar
          placeholder="Search Usernames to Find Users"
          query={searchText}
          onQueryChange={setSearchText}
        />
        <div className="community-chips">
          <FilterChips
            label="Feed"
            value={filters.feed}
            options={feedOptions}
            onChange={changeFeed}
          />
        </div>
      </div>

      <div className="community-layout">
        <section className="community-feed" aria-label="Community feed">
          <CommunityComposer
            firstName={dummyUser.firstName}
            initial={dummyUser.initial}
            onShare={sharePost}
          />

          {posts !== null && posts.length === 0 && newPosts.length === 0 && (
            <GamesEmpty
              message="No posts match your search and filters."
              onReset={() => clearFilters()}
            />
          )}

          {[...newPosts, ...(posts ?? [])].map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onChat={post.author.handle === dummyUser.handle ? undefined : () => startChat(post.author)}
            />
          ))}

          {hasMore && <div ref={sentinelRef} className="community-sentinel" />}

          {posts !== null && posts.length > 0 && !hasMore && (
            <p className="community-end">You’re all caught up with the players you follow.</p>
          )}
        </section>

        <CommunitySidebar friends={friends} unreadMessages={unreadMessages} chatRequest={chatRequest} />
      </div>
    </div>
  );
}

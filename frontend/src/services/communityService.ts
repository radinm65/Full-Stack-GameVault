import type ICommunityPost from "../core/interfaces/models/community/ICommunityPost";
import type { IPostAuthor } from "../core/interfaces/models/community/ICommunityPost";
import type IOnlineFriend from "../core/interfaces/models/community/IOnlineFriend";
import type { IShareChoice, IShareables } from "../core/interfaces/models/community/IShareable";
import type IPage from "../core/interfaces/models/shared/IPage";

// ! DUMMY DATA: replace with GET /api/community/posts and GET /api/community/friends-online
// ! (posts query: q, feed, cursor). Filtering and paging happen on the server, the page only sends
// ! the query string. "Who the user follows" is known by the server, not sent by the page.

const kai: IPostAuthor = { id: "kai", name: "Kai", handle: "kaiplays", initial: "K" };
const jules: IPostAuthor = { id: "jules", name: "Jules", handle: "julesquest", initial: "J" };
const mira: IPostAuthor = { id: "mira", name: "Mira", handle: "miraplays", initial: "M" };
const nova: IPostAuthor = { id: "nova", name: "Nova", handle: "novastrider", initial: "N" };

// ! DUMMY DATA: the signed-in user and the people they follow
const currentUserId = nova.id;
const followedIds = [kai.id, jules.id];

const dummyPosts: ICommunityPost[] = [
  {
    id: 1,
    author: kai,
    kind: "achievement",
    tag: "Achievement unlocked",
    title: "One more run. One big unlock.",
    text: "Finally unlocked God of War! Ares’ keepsake made all the difference. What boon combo got you through your first escape?",
    gameTitle: "Hades",
    timeAgo: "20 min ago",
    image: "/images/Community/hades-banner.png",
  },
  {
    id: 2,
    author: kai,
    kind: "achievement",
    tag: "Achievement unlocked",
    title: "One more run. One big unlock.",
    text: "Finally unlocked God of War! Ares’ keepsake made all the difference. What boon combo got you through your first escape?",
    gameTitle: "Hades",
    timeAgo: "20 min ago",
    image: "/images/Community/hades-banner.png",
  },
  {
    id: 3,
    author: jules,
    kind: "review",
    rating: 5,
    title: "A world worth getting lost in.",
    text: "The atmosphere, the music, the way every shortcut clicks into place. Tough bosses, but every attempt teaches you something. 5 stars from me.",
    gameTitle: "Hollow Knight",
    timeAgo: "3h ago",
    image: "/images/Community/hollow-knight-banner.png",
  },
  {
    id: 4,
    author: mira,
    kind: "review",
    rating: 4,
    title: "Hard, fair and unforgettable.",
    text: "Every boss felt like a puzzle I finally solved. The world is huge and it still respects your time. Easily a favorite.",
    gameTitle: "Elden Ring",
    timeAgo: "5h ago",
  },
  {
    id: 5,
    author: mira,
    kind: "status",
    tag: "Now playing",
    title: "First boss down.",
    text: "Started a new run tonight. Anyone want to team up for the next area?",
    gameTitle: "Elden Ring",
    timeAgo: "1 day ago",
  },
  {
    id: 6,
    author: nova,
    kind: "achievement",
    tag: "Achievement unlocked",
    title: "Neighborhood watch.",
    text: "Cleared every district crime in the city. On to the next challenge.",
    gameTitle: "Marvel's Spider-Man Remastered",
    timeAgo: "2 days ago",
    image: "/images/HorizontalGameCover/spider.jpg",
  },
  {
    id: 7,
    author: nova,
    kind: "status",
    tag: "Now playing",
    title: "Back on the road.",
    text: "Spent the whole evening in Mexico. Forza never gets old.",
    gameTitle: "Forza Horizon 5",
    timeAgo: "4 days ago",
    image: "/images/HorizontalGameCover/Forza.jpg",
  },
];

// The mock page size. The server decides it, the client never sends one.
const PAGE_SIZE = 3;

// `queryString` holds q (username search) and feed:
//   (none) or "following" = people you follow, "activity" = your own posts,
//   "discover" = everyone, "reviews" = review posts
// ! The mock cursor is an offset, the real one is whatever the server returns (opaque to the client).
export async function getCommunityPosts(
  queryString: string,
  cursor: string | null,
): Promise<IPage<ICommunityPost>> {
  const params = new URLSearchParams(queryString);
  const feed = params.get("feed") ?? "";
  const search = (params.get("q") ?? "").trim().toLowerCase();

  const matches = dummyPosts.filter((post) => {
    const isBySearchedUser =
      search === "" ||
      post.author.name.toLowerCase().includes(search) ||
      post.author.handle.toLowerCase().includes(search);

    if (!isBySearchedUser) return false;
    if (feed === "activity") return post.author.id === currentUserId;
    if (feed === "reviews") return post.kind === "review";
    if (feed === "discover") return true;
    return followedIds.includes(post.author.id);
  });

  const start = Number(cursor ?? 0);
  const end = start + PAGE_SIZE;

  return {
    items: matches.slice(start, end),
    nextCursor: end < matches.length ? String(end) : null,
  };
}

// ! DUMMY DATA: what the user can choose from when posting: the achievements they unlocked and
// ! the reviews they wrote. Replace with GET /api/community/shareables
const dummyShareables: IShareables = {
  achievements: [
    {
      id: 1,
      name: "Night Owl",
      gameTitle: "Cyberpunk 2077",
      gameImage: "/images/HorizontalGameCover/Cyber.jpg",
      unlockDate: "2026-10-28",
    },
    {
      id: 2,
      name: "Story Complete",
      gameTitle: "Marvel's Spider-Man Remastered",
      gameImage: "/images/HorizontalGameCover/spider.jpg",
      unlockDate: "2026-10-14",
    },
    {
      id: 3,
      name: "Marathon Runner",
      gameTitle: "Forza Horizon 5",
      gameImage: "/images/HorizontalGameCover/Forza.jpg",
      unlockDate: "2026-09-30",
    },
    {
      id: 4,
      name: "Halfway There",
      gameTitle: "Cyberpunk 2077",
      gameImage: "/images/HorizontalGameCover/Cyber.jpg",
      unlockDate: "2026-09-12",
    },
  ],
  reviews: [
    {
      id: 1,
      gameTitle: "Hollow Knight",
      gameImage: "/images/Community/hollow-knight-banner.png",
      rating: 5,
      text: "The atmosphere, the music, the way every shortcut clicks into place. Tough bosses, but every attempt teaches you something.",
    },
    {
      id: 2,
      gameTitle: "Cyberpunk 2077",
      gameImage: "/images/HorizontalGameCover/Cyber.jpg",
      rating: 4,
      text: "Night City feels alive. Incredible storytelling, unforgettable characters, and an atmosphere that keeps pulling you back.",
    },
  ],
};

export async function getShareables(): Promise<IShareables> {
  return dummyShareables;
}

// Makes a post from what the user picked. `caption` is what they typed in the box, it can be empty.
// ! Replace with POST /api/community/posts. The server returns the new post, shaped like the others.
export async function createCommunityPost(
  choice: IShareChoice,
  caption: string,
): Promise<ICommunityPost> {
  const text = caption.trim();

  if (choice.type === "achievement") {
    const achievement = dummyShareables.achievements.find((item) => item.id === choice.id);
    if (!achievement) throw new Error("Achievement not found");

    return {
      id: Date.now(),
      author: nova,
      kind: "achievement",
      tag: "Achievement unlocked",
      title: achievement.name,
      text: text || `Just unlocked ${achievement.name} in ${achievement.gameTitle}.`,
      gameTitle: achievement.gameTitle,
      timeAgo: "Just now",
      // The image of the game is part of the post, like in the other posts of the feed
      image: achievement.gameImage,
    };
  }

  const review = dummyShareables.reviews.find((item) => item.id === choice.id);
  if (!review) throw new Error("Review not found");

  return {
    id: Date.now(),
    author: nova,
    kind: "review",
    rating: review.rating,
    title: `My take on ${review.gameTitle}`,
    text: text || review.text,
    gameTitle: review.gameTitle,
    timeAgo: "Just now",
    image: review.gameImage,
  };
}

// ! DUMMY DATA: how many messages the user has not read yet. Replace with GET /api/messages/unread-count
export async function getUnreadMessageCount(): Promise<number> {
  return 3;
}

// ! DUMMY DATA: friends that are online right now (presence)
export async function getOnlineFriends(): Promise<IOnlineFriend[]> {
  return [
    { id: "kai", name: "Kai", initial: "K", status: "Playing Hades" },
    { id: "mira", name: "Mira", initial: "M", status: "Playing Elden Ring" },
    { id: "jules", name: "Jules", initial: "J", status: "Browsing games" },
  ];
}

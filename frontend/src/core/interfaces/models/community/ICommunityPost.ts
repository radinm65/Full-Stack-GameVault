// What a post is about. The Reviews chip shows the "review" posts.
type PostKind = "achievement" | "review" | "status";

interface IPostAuthor {
  id: string;
  name: string;
  // Without the @, e.g. "kaiplays"
  handle: string;
  initial: string;
}

interface ICommunityPost {
  id: number;
  author: IPostAuthor;
  kind: PostKind;
  // The text of the red chip above the title, e.g. "Achievement unlocked". Review posts have no chip,
  // they show the rating instead.
  tag?: string;
  // Only for review posts: the rating, a whole number from 1 to 5. Shown as the number and five stars.
  rating?: number;
  title: string;
  text: string;
  gameTitle: string;
  // Already written for the reader, e.g. "20 min ago"
  timeAgo: string;
  image?: string;
}

export type { PostKind, IPostAuthor };
export default ICommunityPost;

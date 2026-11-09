import type ICommunityPost from "../../models/community/ICommunityPost";

interface ICommunityPostCard {
  post: ICommunityPost;
  // Called when the user picks "Chat" in the post menu. Not given for the user's own posts
  // (nobody chats with themselves), those posts show no menu.
  onChat?: () => void;
}

export default ICommunityPostCard;

// An achievement the user unlocked. It can be shared as a post.
interface IShareableAchievement {
  id: number;
  name: string;
  gameTitle: string;
  // The image of the game. It becomes the image of the post.
  gameImage: string;
  // The day it was unlocked, e.g. "2026-10-28"
  unlockDate: string;
}

// A review the user wrote. It can be shared as a post.
interface IShareableReview {
  id: number;
  gameTitle: string;
  // The image of the game. It becomes the image of the post.
  gameImage: string;
  // A whole number from 1 to 5
  rating: number;
  text: string;
}

// The achievements and reviews the user can choose from when posting
interface IShareables {
  achievements: IShareableAchievement[];
  reviews: IShareableReview[];
}

// What the user picked to share
interface IShareChoice {
  type: "achievement" | "review";
  id: number;
}

export type { IShareableAchievement, IShareableReview, IShareables, IShareChoice };

import type ILibraryGame from "../games/ILibraryGame";

interface IProfile {
  handle: string;
  name: string;
  initial: string;
  // Already formatted for the page, e.g. "March 2026"
  joinedAt: string;
  bio: string;
  // The photo of the player. Without one the avatar shows the first letter of the name.
  avatar?: string;
  banner: string;
  friends: number;
  following: number;
  followers: number;
  // Only the owner sees the "Edit profile" button
  isOwn: boolean;
}

type ProfileAchievementIcon = "trophy" | "sparkle" | "swords";

// What the Edit Profile form changes: display name, bio, avatar and cover (the username stays the same)
interface IProfileEdits {
  name: string;
  bio: string;
  avatar?: string;
  banner: string;
}

// One of the achievements the player picked to show on the profile
interface IProfileAchievement {
  id: number;
  icon: ProfileAchievementIcon;
  title: string;
  game: string;
  // e.g. "Traversal challenges · Today"
  detail: string;
}

interface IProfileActivity {
  id: number;
  title: string;
  detail: string;
}

interface IProfileData {
  profile: IProfile;
  achievements: IProfileAchievement[];
  favorites: ILibraryGame[];
  activities: IProfileActivity[];
}

export type { IProfile, IProfileEdits, IProfileAchievement, IProfileActivity, ProfileAchievementIcon };
export default IProfileData;

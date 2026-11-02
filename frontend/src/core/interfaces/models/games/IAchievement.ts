type AchievementCategory = "playtime" | "completion" | "milestones";

// Which artwork the badge shows
type AchievementIcon = "skull" | "swords" | "axe";

// One achievement of a game, shown as a round badge. Hovering it shows all of these fields.
interface IAchievement {
  id: number;
  icon: AchievementIcon;
  name: string;
  // What the achievement represents
  description: string;
  category: AchievementCategory;
  // What the user must do to unlock it
  unlockCondition: string;
  isUnlocked: boolean;
  // Only for unlocked achievements, e.g. "2026-10-28"
  unlockDate?: string;
}

export type { AchievementCategory, AchievementIcon };
export default IAchievement;

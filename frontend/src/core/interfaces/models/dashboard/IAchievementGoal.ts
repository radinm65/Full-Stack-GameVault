interface IAchievementGoal {
  id: number;
  title: string;
  description: string;
  current: number;
  total: number;
  unit: string;
  icon: "trophy" | "flag";
}

export default IAchievementGoal;

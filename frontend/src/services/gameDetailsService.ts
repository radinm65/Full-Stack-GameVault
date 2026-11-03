import type IAchievement from "../core/interfaces/models/games/IAchievement";
import type IGameDetails from "../core/interfaces/models/games/IGameDetails";
import type { IAchievementGroup } from "../core/interfaces/models/games/IGameDetails";
import { dummyLibrary } from "./libraryService";

// ! DUMMY DATA: replace with GET /api/games/:gameId
// ! The server returns everything the game modal shows in one response (see IGameDetails).
// ! `related` is chosen by the server as well. The game ids are the same ones the cards link with.

// Only what the library list does not already know about a game
const dummyExtras: Record<number, { publisher: string; description: string }> = {
  1: {
    publisher: "Sony",
    description:
      "Marvel's Spider-Man Remastered follows an experienced Peter Parker as he swings through a detailed open-world New York, taking down crime bosses while juggling his two lives.",
  },
  2: {
    publisher: "CD Projekt",
    description:
      "Cyberpunk 2077 is a 2020 action role-playing game developed by CD Projekt Red and published by CD Projekt. Based on and set in the fictional universe of Mike Pondsmith's Cyberpunk tabletop game series, Cyberpunk 2077 takes place in the dystopian metropolis of Night City in California.",
  },
  3: {
    publisher: "Xbox Game Studios",
    description:
      "Forza Horizon 5 is an open-world racing festival set across a vibrant and ever-evolving Mexico, with hundreds of cars and events to drive.",
  },
  4: {
    publisher: "Rockstar",
    description:
      "Red Dead Redemption 2 is an epic tale of life in America at the dawn of the modern age, following outlaw Arthur Morgan and the Van der Linde gang.",
  },
  5: {
    publisher: "Sony",
    description:
      "The Last of Us Part I rebuilds the original story of Joel and Ellie as they cross a post-pandemic United States, with modern visuals and combat.",
  },
  6: {
    publisher: "CI Games",
    description:
      "Lords of the Fallen is a punishing soulslike set in two connected worlds, where every lantern-lit step through the realm of the dead can be your last.",
  },
  7: {
    publisher: "Rockstar",
    description:
      "Red Dead Redemption follows former outlaw John Marston, forced by the government to hunt down the members of his old gang in a fading Wild West.",
  },
  8: {
    publisher: "Sony",
    description:
      "Marvel's Spider-Man: Miles Morales follows Miles as he learns to be a hero of his own, defending a snowy New York with brand new bio-electric powers.",
  },
  9: {
    publisher: "Xbox Game Studios",
    description:
      "Forza Horizon 4 is a dynamic open-world racer set in Great Britain, where the seasons change every week and shape every race.",
  },
  10: {
    publisher: "Sony",
    description:
      "The Last of Us Part II Remastered continues Ellie's journey years after the first game, with the full story, extra modes and a sharper presentation.",
  },
  11: {
    publisher: "CD Projekt",
    description:
      "Phantom Liberty is a spy-thriller expansion for Cyberpunk 2077, set in the new district of Dogtown with a new web of loyalties and betrayals.",
  },
  12: {
    publisher: "Xbox Game Studios",
    description:
      "Forza Motorsport is a circuit racing simulator built around realistic tuning, deep car handling and a career of competitive series.",
  },
};

// The screenshot images we have. A game gets the ones that are not its own cover.
const screenshotPool = [
  "/images/HorizontalGameCover/spider.jpg",
  "/images/PublicHomeGameCovers/LordsOfTheFallen.png",
  "/images/HorizontalGameCover/TLOU.jpg",
  "/images/HorizontalGameCover/Reddead.jpg",
  "/images/HorizontalGameCover/Forza.jpg",
  "/images/HorizontalGameCover/Cyber.jpg",
];

// Some covers are vertical posters. The modal background needs the horizontal image of the same game.
const horizontalImages: Record<string, string> = {
  "/images/VarticalGameCover/Cyber.webp": "/images/HorizontalGameCover/Cyber.jpg",
  "/images/VarticalGameCover/TLOU.png": "/images/HorizontalGameCover/TLOU.jpg",
};

// Splits the achievement numbers into the three groups shown in the modal
function toAchievementGroups(unlocked: number, total: number): IAchievementGroup[] {
  const groups = [
    { id: "playtime", label: "Playtime", share: 0.3 },
    { id: "completion", label: "Completion", share: 0.5 },
    { id: "optional", label: "Optional", share: 0.2 },
  ];

  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    unlocked: Math.round(unlocked * group.share),
    total: Math.round(total * group.share),
  }));
}

// The six badges of a game. The first `unlockedCount` of them are unlocked.
// ! DUMMY DATA: every game gets the same six, the server sends the real ones.
function toAchievements(unlockedCount: number): IAchievement[] {
  const isUnlocked = (index: number) => index < unlockedCount;

  return [
    {
      id: 1,
      icon: "skull",
      name: "Night Owl",
      description: "Spend serious time in the game.",
      category: "playtime",
      unlockCondition: "Play for 10 hours in total",
      isUnlocked: isUnlocked(0),
      unlockDate: isUnlocked(0) ? "2026-10-28" : undefined,
    },
    {
      id: 2,
      icon: "swords",
      name: "Marathon Runner",
      description: "Keep going through a long session.",
      category: "playtime",
      unlockCondition: "Play for 5 hours in a single session",
      isUnlocked: isUnlocked(1),
      unlockDate: isUnlocked(1) ? "2026-10-14" : undefined,
    },
    {
      id: 3,
      icon: "axe",
      name: "Story Complete",
      description: "See the story through to its end.",
      category: "completion",
      unlockCondition: "Finish the main story",
      isUnlocked: isUnlocked(2),
      unlockDate: isUnlocked(2) ? "2026-09-30" : undefined,
    },
    {
      id: 4,
      icon: "skull",
      name: "Completionist",
      description: "Leave nothing behind.",
      category: "completion",
      unlockCondition: "Unlock every other achievement",
      isUnlocked: isUnlocked(3),
      unlockDate: isUnlocked(3) ? "2026-09-12" : undefined,
    },
    {
      id: 5,
      icon: "swords",
      name: "Halfway There",
      description: "A first big milestone on the road.",
      category: "milestones",
      unlockCondition: "Reach 50% game progress",
      isUnlocked: isUnlocked(4),
      unlockDate: isUnlocked(4) ? "2026-08-25" : undefined,
    },
    {
      id: 6,
      icon: "axe",
      name: "Legend",
      description: "Reach the very top.",
      category: "milestones",
      unlockCondition: "Reach 100% game progress",
      isUnlocked: isUnlocked(5),
      unlockDate: isUnlocked(5) ? "2026-08-03" : undefined,
    },
  ];
}

// `gameId` is the id from the URL (?game=2). Returns undefined when no game has that id.
export async function getGameDetails(gameId: string): Promise<IGameDetails | undefined> {
  const game = dummyLibrary.find((candidate) => String(candidate.id) === gameId);
  if (!game) return undefined;

  // Other games of the same genre first, then the rest
  const others = dummyLibrary.filter((candidate) => candidate.id !== game.id);
  const related = [
    ...others.filter((candidate) => candidate.genre === game.genre),
    ...others.filter((candidate) => candidate.genre !== game.genre),
  ].slice(0, 3);

  return {
    ...game,
    ...dummyExtras[game.id],
    backdrop: horizontalImages[game.cover] ?? game.cover,
    ratingCount: Math.round(game.rating * 52),
    screenshots: screenshotPool.filter((image) => image !== game.cover).slice(0, 5),
    achievementGroups: toAchievementGroups(game.achievementsUnlocked, game.achievementsTotal),
    achievements: toAchievements(
      Math.round((game.achievementsUnlocked / game.achievementsTotal) * 6),
    ),
    ratingBars: [
      { stars: 5, percent: 80 },
      { stars: 4, percent: 60 },
      { stars: 3, percent: 36 },
      { stars: 2, percent: 12 },
      { stars: 1, percent: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: "Radinm123",
        stars: 4,
        postedAgo: "2h ago",
        text: "Night City feels alive. Incredible storytelling, unforgettable characters, and an atmosphere that keeps pulling you back.",
      },
      {
        id: 2,
        author: "Radinm123",
        stars: 5,
        postedAgo: "2h ago",
        text: "Stunning visuals and a great story, but repetitive missions and shallow combat hold it back.",
      },
    ],
    related,
  };
}

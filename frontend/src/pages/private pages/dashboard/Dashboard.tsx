import "./Dashboard.css";

import {
  IoCheckmarkOutline,
  IoGameControllerOutline,
  IoTimerOutline,
  IoTrophyOutline,
} from "react-icons/io5";

import DashboardHeader from "../../../components/dashboard/dashboardHeader/DashboardHeader";
import FeaturedBanner from "../../../components/dashboard/featuredBanner/FeaturedBanner";
import StatsRow from "../../../components/dashboard/statsRow/StatsRow";
import GameSection from "../../../components/dashboard/gameSection/GameSection";
import AchievementsPanel from "../../../components/dashboard/achievementsPanel/AchievementsPanel";
import FriendsActivityPanel from "../../../components/dashboard/friendsActivityPanel/FriendsActivityPanel";
import GameProgressPanel from "../../../components/dashboard/gameProgressPanel/GameProgressPanel";

import IDashboardGame from "../../../core/interfaces/models/dashboard/IDashboardGame";
import IDashboardStat from "../../../core/interfaces/models/dashboard/IDashboardStat";
import IAchievementGoal from "../../../core/interfaces/models/dashboard/IAchievementGoal";
import IFriendActivity from "../../../core/interfaces/models/dashboard/IFriendActivity";
import IFeaturedProgress from "../../../core/interfaces/models/dashboard/IFeaturedProgress";

// ! DUMMY DATA (everything below until the component): replace with the response of GET /api/dashboard
// ! Each section should load and fail on its own, so split this into one RTK Query hook per section

// ! DUMMY DATA: signed-in user, replace with GET /api/auth/me
const dummyUser = { firstName: "Nova" };

// ! DUMMY DATA: the game the user played most recently ("Jump back in" banner)
const dummyFeaturedGame = {
  image: "/images/HorizontalGameCover/spider.jpg",
  gameTitle: "Marvel's Spider-Man Remastered",
  platform: "PC",
  hoursPlayed: 28,
  lastPlayed: "2 hours ago",
  progress: 62,
  achievementsUnlocked: 38,
  achievementsTotal: 78,
  // TODO: point to the real Game Details route (/games/:gameId)
  continueTo: "/games",
};

// ! DUMMY DATA: high-level metrics, calculate on the server from stored data only
const dummyStats: IDashboardStat[] = [
  { id: "library", value: "12", label: "Games in library", icon: IoGameControllerOutline },
  { id: "achievements", value: "224", label: "Achievements", icon: IoTrophyOutline },
  { id: "playtime", value: "224h", label: "Time Played", icon: IoTimerOutline },
  { id: "completed", value: "4", label: "Games Completed", icon: IoCheckmarkOutline },
];

// ! DUMMY DATA: library entries with status "Playing"
const dummyPlayingGames: IDashboardGame[] = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    publisher: "Sony",
    year: 2021,
    genre: "Action",
    rating: 4.5,
    cover: "/images/HorizontalGameCover/spider.jpg",
    progress: 62,
    hoursPlayed: 28,
    achievementsUnlocked: 38,
    achievementsTotal: 78,
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    publisher: "CD Projekt",
    year: 2020,
    genre: "Action",
    rating: 4.3,
    cover: "/images/HorizontalGameCover/Cyber.jpg",
    progress: 41,
    hoursPlayed: 35,
    achievementsUnlocked: 22,
    achievementsTotal: 44,
  },
  {
    id: 3,
    title: "Forza Horizon 5",
    publisher: "Xbox Game Studios",
    year: 2021,
    genre: "Racing",
    rating: 4.6,
    cover: "/images/HorizontalGameCover/Forza.jpg",
    progress: 74,
    hoursPlayed: 52,
    achievementsUnlocked: 41,
    achievementsTotal: 60,
  },
  {
    id: 4,
    title: "The Last of Us Part I",
    publisher: "Sony",
    year: 2022,
    genre: "Adventure",
    rating: 4.8,
    cover: "/images/HorizontalGameCover/TLOU.jpg",
    progress: 18,
    hoursPlayed: 6,
    achievementsUnlocked: 5,
    achievementsTotal: 36,
  },
];

// ! DUMMY DATA: library entries with status "Saved" (in the library, not started yet)
const dummySavedGames: IDashboardGame[] = [
  {
    id: 5,
    title: "Red Dead Redemption 2",
    publisher: "Rockstar",
    year: 2019,
    genre: "Adventure",
    rating: 4.9,
    cover: "/images/HorizontalGameCover/Reddead.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 52,
  },
  {
    id: 6,
    title: "The Last of Us Part I",
    publisher: "Sony",
    year: 2022,
    genre: "Adventure",
    rating: 4.8,
    cover: "/images/HorizontalGameCover/TLOU.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 36,
  },
  {
    id: 7,
    title: "Forza Horizon 5",
    publisher: "Xbox Game Studios",
    year: 2021,
    genre: "Racing",
    rating: 4.6,
    cover: "/images/HorizontalGameCover/Forza.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 60,
  },
  {
    id: 8,
    title: "Cyberpunk 2077",
    publisher: "CD Projekt",
    year: 2020,
    genre: "Action",
    rating: 4.3,
    cover: "/images/HorizontalGameCover/Cyber.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 44,
  },
];

// ! DUMMY DATA: wishlist entries (price is only shown here)
const dummyWishlistGames: IDashboardGame[] = [
  {
    id: 9,
    title: "Marvel's Spider-Man Remastered",
    publisher: "Sony",
    year: 2021,
    genre: "Action",
    rating: 4.5,
    cover: "/images/HorizontalGameCover/spider.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 78,
    price: 80,
  },
  {
    id: 10,
    title: "Forza Horizon 5",
    publisher: "Xbox Game Studios",
    year: 2021,
    genre: "Racing",
    rating: 4.6,
    cover: "/images/HorizontalGameCover/Forza.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 60,
    price: 96,
  },
  {
    id: 11,
    title: "Red Dead Redemption 2",
    publisher: "Rockstar",
    year: 2019,
    genre: "Adventure",
    rating: 4.9,
    cover: "/images/HorizontalGameCover/Reddead.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 52,
    price: 50,
  },
  {
    id: 12,
    title: "Cyberpunk 2077",
    publisher: "CD Projekt",
    year: 2020,
    genre: "Action",
    rating: 4.3,
    cover: "/images/HorizontalGameCover/Cyber.jpg",
    progress: 0,
    hoursPlayed: 0,
    achievementsUnlocked: 0,
    achievementsTotal: 44,
    price: 60,
  },
];

// ! DUMMY DATA: closest achievements the user is working towards
const dummyGoals: IAchievementGoal[] = [
  {
    id: 1,
    title: "Neighborhood Watch",
    description: "Spider-Man Â· Complete all district crimes",
    current: 12,
    total: 15,
    unit: "Minutes",
    icon: "trophy",
  },
  {
    id: 2,
    title: "Neighborhood Watch",
    description: "Spider-Man Â· Complete all district crimes",
    current: 12,
    total: 15,
    unit: "Minutes",
    icon: "trophy",
  },
  {
    id: 3,
    title: "The next escape",
    description: "Hades Â· Reach the surface again",
    current: 10,
    total: 18,
    unit: "Minutes",
    icon: "flag",
  },
  {
    id: 4,
    title: "The next escape",
    description: "Hades Â· Reach the surface again",
    current: 10,
    total: 18,
    unit: "Minutes",
    icon: "flag",
  },
];

// ! DUMMY DATA: compact preview of followed users' activity (reviews and game status)
const dummyStatusActivities: IFriendActivity[] = [
  { id: 1, initial: "M", title: "Mira started Elden Ring", detail: "Playing now Â· PC" },
  { id: 2, initial: "M", title: "Mira started Elden Ring", detail: "Playing now Â· PC" },
  { id: 3, initial: "J", title: "Jules reviewed Hollow Knight", detail: "\"Worth every attempt.\" Â· 1h ago" },
];

// ! DUMMY DATA: compact preview of followed users' achievement unlocks
const dummyAchievementActivities: IFriendActivity[] = [
  { id: 4, initial: "K", title: "Kai unlocked \"God of War\"", detail: "Hades Â· 20 min ago" },
  { id: 5, initial: "K", title: "Kai unlocked \"God of War\"", detail: "Hades Â· 20 min ago" },
  { id: 6, initial: "K", title: "Kai unlocked \"God of War\"", detail: "Hades Â· 20 min ago" },
];

// ! DUMMY DATA: number of followed users currently online (presence)
const dummyFriendsOnline = 3;

// ! DUMMY DATA: games for the featured game-progress panel (one slide per dot)
const dummyFeaturedProgress: IFeaturedProgress[] = [
  {
    id: 1,
    image: "/images/HorizontalGameCover/spider.jpg",
    title: "Marvel's Spider-Man Remastered",
    progress: 80,
    playTime: "2h 7m",
    achievements: "36/48",
    status: "Playing",
    lastPlayed: "2 Days Ago",
  },
  {
    id: 2,
    image: "/images/HorizontalGameCover/Cyber.jpg",
    title: "Cyberpunk 2077",
    progress: 41,
    playTime: "35h 20m",
    achievements: "22/44",
    status: "Playing",
    lastPlayed: "Yesterday",
  },
  {
    id: 3,
    image: "/images/HorizontalGameCover/Forza.jpg",
    title: "Forza Horizon 5",
    progress: 74,
    playTime: "52h 4m",
    achievements: "41/60",
    status: "Playing",
    lastPlayed: "4 Days Ago",
  },
  {
    id: 4,
    image: "/images/HorizontalGameCover/TLOU.jpg",
    title: "The Last of Us Part I",
    progress: 18,
    playTime: "6h 12m",
    achievements: "5/36",
    status: "Playing",
    lastPlayed: "1 Week Ago",
  },
];

export default function Dashboard() {
  // TODO: add loading / empty / error states per section, plus the first-time (empty) dashboard with onboarding actions
  return (
    <div className="dashboard-page">
      <DashboardHeader firstName={dummyUser.firstName} />
      <FeaturedBanner {...dummyFeaturedGame} />
      <StatsRow stats={dummyStats} />

      {/* TODO: link to the Library tab filtered by status once /games supports ?tab=library&status=playing */}
      <GameSection
        title="Currently Playing"
        linkText="Games"
        linkTo="/games"
        games={dummyPlayingGames}
      />
      {/* TODO: link to the Library tab filtered by status once /games supports ?tab=library&status=saved */}
      <GameSection
        title="Want To Play"
        linkText="Library"
        linkTo="/games"
        games={dummySavedGames}
      />
      {/* TODO: "Wishlist" should open the Wishlist modal on the Games page instead of navigating */}
      <GameSection
        title="Wishlist"
        linkText="Wishlist"
        linkTo="/games"
        games={dummyWishlistGames}
        variant="wishlist"
      />

      <div className="dashboard-panels">
        <AchievementsPanel goals={dummyGoals} />
        <FriendsActivityPanel
          statusActivities={dummyStatusActivities}
          achievementActivities={dummyAchievementActivities}
          onlineCount={dummyFriendsOnline}
        />
      </div>

      <GameProgressPanel games={dummyFeaturedProgress} />
    </div>
  );
}

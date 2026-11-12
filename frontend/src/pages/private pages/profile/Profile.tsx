import "./Profile.css";

import { useParams } from "react-router";

import GamesHeader from "../../../components/games/gamesHeader/GamesHeader";
import ProfileActivity from "../../../components/profile/profileActivity/ProfileActivity";
import ProfileAchievementCard from "../../../components/profile/profileAchievementCard/ProfileAchievementCard";
import ProfileFavoriteCard from "../../../components/profile/profileFavoriteCard/ProfileFavoriteCard";
import ProfileFilters from "../../../components/profile/profileFilters/ProfileFilters";
import ProfileHero from "../../../components/profile/profileHero/ProfileHero";
import ProfileSection from "../../../components/profile/profileSection/ProfileSection";
import ProfileThemeToggle from "../../../components/profile/profileThemeToggle/ProfileThemeToggle";

import useLoadData from "../../../hooks/useLoadData";
import useUrlFilters from "../../../hooks/useUrlFilters";
import type ProfileView from "../../../core/interfaces/models/profile/ProfileView";
import { getProfile } from "../../../services/profileService";

// The chip under the profile card is kept in the URL: /profile?view=achievements
const defaults = {
  view: "all",
};

const views: ProfileView[] = ["all", "achievements", "activity"];

// /profile is your own profile, /profile/kaiplays is another player's
export default function Profile() {
  const { handle = "" } = useParams();
  const { filters, setFilter } = useUrlFilters(defaults);

  // A wrong value in the URL (?view=abc) falls back to "all"
  const view = views.find((name) => name === filters.view) ?? "all";

  // The profile loads by the handle. useLoadData calls it "queryString", here it is the handle.
  const data = useLoadData(getProfile, handle);

  return (
    <div className="profile-page">
      <div className="profile-top">
        <GamesHeader title="Profile" subtitle="Your games. Your milestones. Your story." />
        <ProfileThemeToggle />
      </div>

      {data !== null && (
        <>
          <ProfileHero profile={data.profile} />

          <ProfileFilters active={view} onChange={(next) => setFilter("view", next)} />

          {view !== "activity" && (
            <ProfileSection
              title="Achievement Showcase"
              actionLabel={data.profile.isOwn ? "Customize" : undefined}
            >
              <div className="profile-grid">
                {data.achievements.map((achievement) => (
                  <ProfileAchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </ProfileSection>
          )}

          {view === "all" && (
            <ProfileSection
              title="Favorite Games"
              actionLabel={data.profile.isOwn ? "Edit favorites" : undefined}
            >
              <div className="profile-grid">
                {data.favorites.map((game) => (
                  <ProfileFavoriteCard key={game.id} game={game} />
                ))}
              </div>
            </ProfileSection>
          )}

          {view === "activity" && (
            <ProfileSection title="Recent Activity">
              <ProfileActivity activities={data.activities} />
            </ProfileSection>
          )}
        </>
      )}
    </div>
  );
}

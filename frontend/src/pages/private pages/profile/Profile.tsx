import "./Profile.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import GamesHeader from "../../../components/games/gamesHeader/GamesHeader";
import EditProfileDialog from "../../../components/profile/editProfileDialog/EditProfileDialog";
import ProfileActivity from "../../../components/profile/profileActivity/ProfileActivity";
import ProfileAchievementCard from "../../../components/profile/profileAchievementCard/ProfileAchievementCard";
import ProfileFavoriteCard from "../../../components/profile/profileFavoriteCard/ProfileFavoriteCard";
import ProfileFilters from "../../../components/profile/profileFilters/ProfileFilters";
import ProfileHero from "../../../components/profile/profileHero/ProfileHero";
import ProfileSection from "../../../components/profile/profileSection/ProfileSection";
import ProfileThemeToggle from "../../../components/profile/profileThemeToggle/ProfileThemeToggle";

import useLoadData from "../../../hooks/useLoadData";
import useUrlFilters from "../../../hooks/useUrlFilters";
import type { IProfileEdits } from "../../../core/interfaces/models/profile/IProfile";
import type ProfileView from "../../../core/interfaces/models/profile/ProfileView";
import { getProfile, updateProfile } from "../../../services/profileService";

// How long the "Profile updated" message stays on the screen
const SAVED_MESSAGE_DURATION = 3000;

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

  // What the user saved in the Edit Profile form. The loaded profile is not edited, the saved values are laid
  // over it.
  // ! With the real API, reload the profile (or edit it) after the save instead of keeping this here.
  const [edits, setEdits] = useState<IProfileEdits | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const profile =
    data === null
      ? null
      : { ...data.profile, ...edits, initial: (edits?.name ?? data.profile.name).charAt(0).toUpperCase() };

  const saveProfile = async (next: IProfileEdits) => {
    await updateProfile(next);
    setEdits(next);
    setIsSaved(true);
  };

  // The "Profile updated" message goes away by itself
  useEffect(() => {
    if (!isSaved) return;

    const timer = window.setTimeout(() => setIsSaved(false), SAVED_MESSAGE_DURATION);
    return () => window.clearTimeout(timer);
  }, [isSaved]);

  return (
    <div className="profile-page">
      <div className="profile-top">
        <GamesHeader title="Profile" subtitle="Your games. Your milestones. Your story." />
        <ProfileThemeToggle />
      </div>

      {data !== null && profile !== null && (
        <>
          <ProfileHero profile={profile} onEdit={() => setIsEditing(true)} />

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

          {isEditing && (
            <EditProfileDialog
              profile={profile}
              onSave={saveProfile}
              onClose={() => setIsEditing(false)}
            />
          )}
        </>
      )}

      {isSaved && (
        <p className="profile-toast" role="status">
          Profile updated.
        </p>
      )}
    </div>
  );
}

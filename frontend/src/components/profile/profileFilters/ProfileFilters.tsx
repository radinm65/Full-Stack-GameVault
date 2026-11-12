import "./ProfileFilters.css";

import type ProfileView from "../../../core/interfaces/models/profile/ProfileView";
import IProfileFilters from "../../../core/interfaces/props/profile/IProfileFilters.props";

const views: { id: ProfileView; label: string }[] = [
  { id: "all", label: "All" },
  { id: "achievements", label: "Achievements" },
  { id: "activity", label: "Activity" },
];

// The chips under the profile card
export default function ProfileFilters({ active, onChange }: IProfileFilters) {
  return (
    <div className="profile-filters" role="group" aria-label="Profile sections">
      {views.map((view) => (
        <button
          key={view.id}
          type="button"
          aria-pressed={active === view.id}
          className={`profile-chip ${active === view.id ? "profile-chip--active" : ""}`}
          onClick={() => onChange(view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

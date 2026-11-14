import "./ProfileSection.css";

import { FiArrowUpRight } from "react-icons/fi";

import IProfileSection from "../../../core/interfaces/props/profile/IProfileSection.props";

// A titled block of the profile page (the achievement showcase, the favorite games...)
export default function ProfileSection({ title, actionLabel, children }: IProfileSection) {
  return (
    <section className="profile-section">
      <div className="profile-section-header">
        <h2>{title}</h2>

        {actionLabel && (
          // TODO: open the editor that picks what this section shows
          <button type="button" className="profile-section-action">
            {actionLabel} <FiArrowUpRight />
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

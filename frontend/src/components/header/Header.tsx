import "./Header.css";

import { Link } from "react-router";

import { IoNotificationsOutline } from "react-icons/io5";

import GamevaultLogo from "../../assets/logo/GamevaultLogo";

// ! DUMMY DATA: replace with the signed-in user from GET /api/auth/me
const dummyUser = {
  displayName: "Nova Strider",
  initial: "N",
  hasUnreadNotifications: true,
};

export default function Header() {
  return (
    <header className="private-header">
      <Link to="/dashboard" className="private-header-logo" aria-label="Game Vault dashboard">
        <GamevaultLogo height={72} width={72} />
      </Link>

      <div className="private-header-actions">
        {/* TODO: link to /notifications and drive the unread dot from real notifications */}
        <Link to="/notifications" className="private-header-bell" aria-label="Notifications">
          <IoNotificationsOutline size={26} />
          {dummyUser.hasUnreadNotifications && (
            <span className="private-header-unread" />
          )}
        </Link>

        {/* TODO: turn into the avatar menu (Settings, Theme, Log out) */}
        <Link to="/profile" className="private-header-user">
          <span className="private-header-avatar">{dummyUser.initial}</span>
          <span className="private-header-name">{dummyUser.displayName}</span>
        </Link>
      </div>
    </header>
  );
}

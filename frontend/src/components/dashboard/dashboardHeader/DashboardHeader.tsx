import "./DashboardHeader.css";

import { IoSearchOutline } from "react-icons/io5";

import IDashboardHeader from "../../../core/interfaces/props/dashboard/IDashboardHeader.props";

export default function DashboardHeader({ firstName }: IDashboardHeader) {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-text">
        <p className="dashboard-header-eyebrow">YOUR PLAY. CONNECTED.</p>
        <h1>DASHBOARD</h1>
        <p className="dashboard-header-welcome">
          Welcome back, {firstName}. Your next milestone is waiting.
        </p>
      </div>

      {/* TODO: wire the search to the Explore title search (debounced) once the Games page exists */}
      <form
        className="dashboard-search"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <IoSearchOutline size={20} />
        <input
          type="search"
          name="search"
          placeholder="Search games, worlds and adventures"
          aria-label="Search games, worlds and adventures"
        />
      </form>
    </div>
  );
}

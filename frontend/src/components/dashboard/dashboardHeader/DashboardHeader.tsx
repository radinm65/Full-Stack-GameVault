import "./DashboardHeader.css";

import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

import { IoSearchOutline } from "react-icons/io5";

import IDashboardHeader from "../../../core/interfaces/props/dashboard/IDashboardHeader.props";

export default function DashboardHeader({ firstName }: IDashboardHeader) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Hand the search over to the Explore tab of the Games page
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = query.trim();
    navigate(trimmed ? `/games?q=${encodeURIComponent(trimmed)}` : "/games");
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-text">
        <p className="dashboard-header-eyebrow">YOUR PLAY. CONNECTED.</p>
        <h1>DASHBOARD</h1>
        <p className="dashboard-header-welcome">
          Welcome back, {firstName}. Your next milestone is waiting.
        </p>
      </div>

      <form className="dashboard-search" role="search" onSubmit={handleSearch}>
        <IoSearchOutline size={20} />
        <input
          type="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games, worlds and adventures"
          aria-label="Search games, worlds and adventures"
        />
      </form>
    </div>
  );
}

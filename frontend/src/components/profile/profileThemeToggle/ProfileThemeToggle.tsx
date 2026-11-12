import "./ProfileThemeToggle.css";

import { useState } from "react";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

// The dark / light switch next to the page title.
// TODO: apply the theme to the whole app (data-theme on <html>) and remember it. The private layout still has
// hard-coded dark colors, so for now the switch only moves.
export default function ProfileThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={`theme-toggle-button ${theme === "dark" ? "theme-toggle-button--active" : ""}`}
        aria-pressed={theme === "dark"}
        aria-label="Dark theme"
        onClick={() => setTheme("dark")}
      >
        <IoMoonOutline size={22} />
      </button>
      <button
        type="button"
        className={`theme-toggle-button ${theme === "light" ? "theme-toggle-button--active" : ""}`}
        aria-pressed={theme === "light"}
        aria-label="Light theme"
        onClick={() => setTheme("light")}
      >
        <IoSunnyOutline size={24} />
      </button>
    </div>
  );
}

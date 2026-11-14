import "./ProfileThemeToggle.css";

import { useState } from "react";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

// The dark / light switch next to the page title. A round knob slides between the moon and the sun. It
// looks like a slider, but it only moves when one of the icons is clicked.
// TODO: apply the theme to the whole app (data-theme on <html>) and remember it. The private layout still has
// hard-coded dark colors, so for now the switch only moves.
export default function ProfileThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div
      className={`theme-toggle ${theme === "light" ? "theme-toggle--light" : ""}`}
      role="group"
      aria-label="Color theme"
    >
      <span className="theme-toggle-knob" aria-hidden="true" />

      <button
        type="button"
        className="theme-toggle-button"
        aria-pressed={theme === "dark"}
        aria-label="Dark theme"
        onClick={() => setTheme("dark")}
      >
        <IoMoonOutline size={20} />
      </button>
      <button
        type="button"
        className="theme-toggle-button"
        aria-pressed={theme === "light"}
        aria-label="Light theme"
        onClick={() => setTheme("light")}
      >
        <IoSunnyOutline size={22} />
      </button>
    </div>
  );
}

import "./Section3.css";

import { LuCompass, LuTrophy, LuUsers } from "react-icons/lu";

const values = [
  {
    icon: <LuCompass size={35} />,
    title: "Find and keep games",
    text: "Explore the catalog in Games and filter by genre, platform, rating or playtime. Build your Library, keep a Wishlist and group favorites into Collections.",
  },
  {
    icon: <LuTrophy size={35} />,
    title: "Track your play",
    text: "Start a session when you play, watch your playtime grow and unlock achievements along the way. Your Dashboard keeps your progress at a glance.",
  },
  {
    icon: <LuUsers size={35} />,
    title: "Share the journey",
    text: "Make your Profile your own, follow other players and share reviews in the Community. Message friends directly when you want to talk games.",
  },
];

export default function Section3() {
  return (
    <div className="about-section about-section3">
      <p className="about-label">INSIDE THE WEB APP</p>
      <h1>EVERYTHING YOU PLAY, IN ONE VAULT.</h1>
      <div className="about-section3-cards">
        {values.map((value) => (
          <div className="about-section3-card" key={value.title}>
            <span className="about-section3-icon">{value.icon}</span>
            <h2>{value.title}</h2>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

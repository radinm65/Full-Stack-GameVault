import "./Section5.css";

import {
  LuBookmark,
  LuCompass,
  LuFlag,
  LuMessageCircle,
  LuTrophy,
  LuUsers,
} from "react-icons/lu";

const highlights = [
  {
    icon: <LuCompass size="22px" />,
    title: "Explore by interest",
    text: "Explore games across genres and themes that catch your eye.",
  },
  {
    icon: <LuBookmark size="22px" />,
    title: "Remember what is next",
    text: "Keep interesting games on your radar for your next session.",
  },
  {
    icon: <LuTrophy size="22px" />,
    title: "Track achievements",
    text: "Keep your achievements alongside the games you play.",
  },
  {
    icon: <LuFlag size="22px" />,
    title: "Build toward a goal",
    text: "Choose a goal and keep track of the progress you make.",
  },
  {
    icon: <LuMessageCircle size="22px" />,
    title: "Exchange recommendations",
    text: "Find new games through the tastes and reviews of other players.",
  },
  {
    icon: <LuUsers size="22px" />,
    title: "Share the journey",
    text: "Follow the journey—not just the final result.",
  },
];

export default function Section5() {
  return (
    <div className="features-section features-section5">
      <p className="features-label">THE BIG PICTURE</p>
      <h1>BUILT AROUND THE WAY YOU PLAY.</h1>
      <div className="features-section5-cards">
        {highlights.map((item) => (
          <div className="features-section5-card" key={item.title}>
            <span className="features-section5-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

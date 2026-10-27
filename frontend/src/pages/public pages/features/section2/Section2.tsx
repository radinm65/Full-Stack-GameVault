import "./Section2.css";

import { LuCompass, LuTrophy, LuUsers } from "react-icons/lu";

const tabs = [
  { number: "01", icon: <LuCompass size="20px" />, title: "Discovery", link: "#discovery" },
  { number: "02", icon: <LuTrophy size="20px" />, title: "Achievement tracking", link: "#achievement-tracking" },
  { number: "03", icon: <LuUsers size="20px" />, title: "Community", link: "#community" },
];

export default function Section2() {
  return (
    <div className="features-section2">
      {tabs.map((tab) => (
        <a href={tab.link} className="features-section2-tab" key={tab.title}>
          <span className="features-section2-number">{tab.number}</span>
          <span className="features-section2-icon">{tab.icon}</span>
          {tab.title}
        </a>
      ))}
    </div>
  );
}

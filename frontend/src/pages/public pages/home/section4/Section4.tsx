import "./Section4.css";

import { LuMessageCircle, LuSparkles, LuSwords } from "react-icons/lu";

const features = [
  {
    title: "Follow Players",
    icon: <LuMessageCircle size="22px" />,
    description: "Keep up with the players you care about",
  },
  {
    title: "Share Reviews",
    icon: <LuSwords size="22px" />,
    description: "Share your thoughts on the games you play",
  },
  {
    title: "Track Activity",
    icon: <LuSparkles size="22px" />,
    description: "See the latest gaming milestones from people you follow",
  },
];

const faqs = [
  {
    question: "What is Game Vault?",
    answer:
      "Game Vault is a place to discover games, track achievements and connect with other players.",
  },
  {
    question: "Can I track my gaming achievements?",
    answer:
      "You can keep track of your gaming progress and achievements for the games supported by Game Vault.",
  },
  {
    question: "Can I follow other players?",
    answer:
      "Yes. Follow players to keep up with their gaming activity and reviews.",
  },
];

export default function Section4() {
  return (
    <div className="home-section4">
      <div className="home-section4-connect">
        <div className="home-section4-text-content">
          <p className="home-section4-label">CONNECT</p>
          <h1>GAMING IS BETTER TOGETHER.</h1>
          <p className="home-section4-intro">
            Follow players, share your reviews and keep up with the games and
            achievements that matter to your community.
          </p>
          <div className="home-section4-features">
            {features.map((feature) => (
              <div className="home-section4-feature" key={feature.title}>
                <span className="home-section4-feature-icon">
                  {feature.icon}
                </span>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="home-section4-faq">
        <p className="home-section4-label">BEFORE YOU JUMP IN</p>
        <h1>A FEW QUICK ANSWERS.</h1>
        <div className="home-section4-faq-list">
          {faqs.map((faq) => (
            <div className="home-section4-faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

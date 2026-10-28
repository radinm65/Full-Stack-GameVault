import "./Section5.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

const habits = [
  {
    number: "01",
    title: "Welcome different players",
    text: "Newcomers, veterans and different points of view all belong in the conversation.",
  },
  {
    number: "02",
    title: "Share without spoiling",
    text: "Give a heads-up before plot reveals and help others discover games on their own terms.",
  },
  {
    number: "03",
    title: "Keep it constructive",
    text: "Offer useful feedback, credit creators and disagree without making it personal.",
  },
  {
    number: "04",
    title: "Celebrate each other",
    text: "A first win can matter just as much as a perfect run. Let people enjoy their moment.",
  },
];

export default function Section5() {
  return (
    <div className="about-section about-section5">
      <div className="about-split">
        <div className="about-section5-title">
          <p className="about-label">THE COMMUNITY WE WANT</p>
          <h1>BRING YOUR PASSION. LEAVE THE TOXICITY.</h1>
          <p className="about-intro">
            A great community is built through everyday choices. Here are the
            habits we want to encourage.
          </p>
          <Link to="/terms" className="about-section5-link">
            Read the draft community terms <FiArrowUpRight />
          </Link>
        </div>

        <div className="about-section5-habits">
          {habits.map((habit) => (
            <div className="about-section5-habit" key={habit.number}>
              <span className="about-section5-number">{habit.number}</span>
              <div className="about-section5-habit-text">
                <h3>{habit.title}</h3>
                <p>{habit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

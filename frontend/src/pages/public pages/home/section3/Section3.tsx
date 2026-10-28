import "./Section3.css";

import { Fragment } from "react";

import { IoIosCheckmark } from "react-icons/io";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuTimer } from "react-icons/lu";
import { PiTrophy } from "react-icons/pi";

const steps = [
  {
    title: "PLAY",
    icon: <IoGameControllerOutline size="28px" />,
    description: "Jump into your favorite games.",
  },
  {
    title: "TRACK",
    icon: <LuTimer size="28px" />,
    description: "Track every minute you play.",
  },
  {
    title: "ACHIEVE",
    icon: <PiTrophy size="28px" />,
    description: "Unlock achievements. Celebrate every win.",
  },
];

export default function Section3() {
  return (
    <div className="section3-wrapper">
      <div className="home-section3-text">
        <h3>TRACK & ACHIEVE</h3>
        <h1>THE GRIND. THE GLORY. THE NEXT GOAL.</h1>
        <p>
          From your first unlock to your toughest challenge, keep your gaming
          progress in view and choose what to aim for next.
        </p>
        <p>
          <IoIosCheckmark size="40px" color="#e53945" />
          Keep your unlocked achievements together
        </p>
        <p>
          <IoIosCheckmark size="40px" color="#e53945" />
          Set your sights on the next milestone
        </p>
        <p>
          <IoIosCheckmark size="40px" color="#e53945" />
          Celebrate the progress you make
        </p>
      </div>
      <div className="home-section3-content">
        <span className="story-badge">EVERY UNLOCK HAS A STORY</span>
        <div className="achievement-route">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              {index > 0 && <span className="achievement-line" />}
              <div className="achievement-step">
                <h4>{step.title}</h4>
                <span className="achievement-icon">{step.icon}</span>
                <p>{step.description}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

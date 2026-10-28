import "./Section3.css";

import { Fragment } from "react";

import { IoGameControllerOutline } from "react-icons/io5";
import { LuTimer } from "react-icons/lu";
import { PiTrophy } from "react-icons/pi";

const steps = [
  {
    title: "PLAY",
    icon: <IoGameControllerOutline size="22px" />,
    description: "Jump into your favorite games.",
  },
  {
    title: "TRACK",
    icon: <LuTimer size="22px" />,
    description: "Track every minute you play.",
  },
  {
    title: "ACHIEVE",
    icon: <PiTrophy size="22px" />,
    description: "Unlock achievements. Celebrate every win.",
  },
];

export default function Section3() {
  return (
    <div className="features-section features-section3" id="achievement-tracking">
      <div className="features-split features-split-reverse">
        <div className="features-text">
          <p className="features-label">02 / ACHIEVEMENT TRACKING</p>
          <h1>EVERY MILESTONE. ALL YOUR MOMENTUM.</h1>
          <p className="features-intro">
            Track the achievements you unlock, see what is still ahead and
            choose a goal that feels worth the effort.
          </p>
          <div className="features-point">
            <h3>See what you have accomplished</h3>
            <p>Keep your unlocked achievements and next challenges in view.</p>
          </div>
          <div className="features-point">
            <h3>Make the next step yours</h3>
            <p>
              Celebrate a personal milestone or return to a game with a new
              goal.
            </p>
          </div>
        </div>

        <div className="features-section3-card">
          <span className="features-section3-badge">EVERY UNLOCK HAS A STORY</span>
          <div className="features-section3-route">
            {steps.map((step, index) => (
              <Fragment key={step.title}>
                {index > 0 && <span className="features-section3-line" />}
                <div className="features-section3-step">
                  <h4>{step.title}</h4>
                  <span className="features-section3-icon">{step.icon}</span>
                  <p>{step.description}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

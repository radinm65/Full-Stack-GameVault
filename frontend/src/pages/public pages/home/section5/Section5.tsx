import "./Section5.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

export default function Section5() {
  return (
    <div className="home-section5">
      <p className="home-section5-label">THE NEXT CHAPTER IS YOURS</p>
      <h1>YOUR NEXT GAMING CHAPTER STARTS HERE.</h1>
      <p className="home-section5-text">
        Build your library, track your progress and find your place in the
        community.
      </p>
      <div className="home-section5-actions">
        <Link to="/register" className="home-section5-cta">
          GET STARTED <FiArrowUpRight />
        </Link>
        <Link to="/login" className="home-section5-login">
          Already a member? Log in
        </Link>
      </div>
    </div>
  );
}

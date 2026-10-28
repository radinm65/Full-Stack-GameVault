import './Section2.css'

import { Link } from 'react-router';

import { FiArrowUpRight } from "react-icons/fi";

export default function Section2() {
  return (
    <div className="home-section2">
      <div className="home-section2-details-wrapper">
        <div className="home-section2-intro-div">
          <h1>FOLLOW YOUR CURIOSITY.</h1>
          <h2>
            Explore genres, discover new worlds and find your next favorite
            game.
          </h2>
          <div className="home-section2-details">
            <h3>WORLDS TO GET LOST IN</h3>
            <span>|</span>
            <h3>ADVENTURES TO REMEMBER</h3>
            <span>|</span>
            <h3>STORIES YET TO UNFOLD</h3>
          </div>
        </div>
        <div className="home-section2-button">
          <Link to={"/games"} className="explore-games-link">
            Explore Games
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

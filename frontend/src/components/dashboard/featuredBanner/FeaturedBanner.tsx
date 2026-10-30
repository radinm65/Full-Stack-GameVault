import "./FeaturedBanner.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

import ProgressBar from "../../progressBar/ProgressBar";
import IFeaturedBanner from "../../../core/interfaces/props/dashboard/IFeaturedBanner.props";

export default function FeaturedBanner({
  image,
  gameTitle,
  platform,
  hoursPlayed,
  lastPlayed,
  progress,
  achievementsUnlocked,
  achievementsTotal,
  continueTo,
}: IFeaturedBanner) {
  return (
    <section className="featured-banner" aria-label="Jump back in">
      <img src={image} alt="" className="featured-banner-image" />

      <div className="featured-banner-content">
        <span className="featured-banner-chip">JUMP BACK IN</span>
        <h2>YOUR CITY. YOUR NEXT CHAPTER.</h2>

        <div className="featured-banner-meta">
          <p>
            {gameTitle}  {platform}
          </p>
          <p>
            {hoursPlayed}h played · Last played {lastPlayed}
          </p>
        </div>

        <div className="featured-banner-progress">
          <ProgressBar value={progress} />
          <p>
            {progress}% complete / {achievementsUnlocked} of {achievementsTotal}{" "}
            achievements
          </p>
        </div>

        <Link to={continueTo} className="featured-banner-link">
          Continue playing <FiArrowUpRight />
        </Link>
      </div>
    </section>
  );
}

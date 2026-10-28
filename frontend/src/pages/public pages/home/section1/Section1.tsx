import "./Section1.css";

import { Link } from "react-router";

import { RiCompass3Line } from "react-icons/ri";
import { RxPeople } from "react-icons/rx";
import { GoTrophy } from "react-icons/go";
import { FiArrowUpRight } from "react-icons/fi";

export default function Section1() {
  const section1Cards = [
    {
      icon: <RiCompass3Line size={35} color={"#e53945"} />,
      title: "FIND YOUR NEXT GAME",
      text: "Explore genres, uncover new worlds and find games worth adding to your library.",
      link: "/games",
      linkText: "Explore Games",
    },
    {
      icon: <GoTrophy size={35} color={"#e53945"} />,
      title: "MAKE PROGRESS COUNT",
      text: "Track your unlocked achievements, choose a new goal and celebrate every milestone.",
      link: "/profile",
      linkText: "View Achievements",
    },
    {
      icon: <RxPeople size={35} color={"#e53945"} />,
      title: "FIND YOUR PEOPLE",
      text: "Follow players, share game reviews and keep up with the moments that matter.",
      link: "/community",
      linkText: "Explore Community",
    },
  ];

  return (
    <div className="home-section1">
      <p>MORE THAN YOUR NEXT GAME</p>
      <h1>EVERY PART OF YOUR PLAY, CONNECTED.</h1>
      <p>
        Discover games, keep track of your achievements and follow the players
        whose journeys inspire you.
      </p>

      <div className="home-section1-cards">
        {section1Cards.map((card) => (
          <div className="home-explore-games-card">
            {card.icon}
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <Link to={card.link} className="home-section1-link">
              {card.linkText} <FiArrowUpRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

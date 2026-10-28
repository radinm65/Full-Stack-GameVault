import PublicCta from "../../../components/publicCta/PublicCta";
import "./About.css";

import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import Section5 from "./section5/Section5";

export default function About() {
  return (
    <div className="about-page-wrapper">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <PublicCta
        title="THERE IS A PLACE FOR YOUR PLAY."
        text="Create an account and step into your Game Vault: discover new games, track your progress and meet the players who make gaming more fun."
      />
    </div>
  );
}

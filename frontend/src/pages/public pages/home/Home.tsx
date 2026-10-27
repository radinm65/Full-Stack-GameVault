import HomeSlider from "../../../components/homeSlider/HomeSlide";
import PublicCta from "../../../components/publicCta/PublicCta";
import "./Home.css";

import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";

export default function Home() {
  return (
    <div className="home-page-wrapper">
      <HomeSlider />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <PublicCta
        title="YOUR NEXT GAMING CHAPTER STARTS HERE."
        text="Build your library, track your progress and find your place in the
        community."
      />
    </div>
  );
}

import HomeSlider from "../../../components/homeSlider/HomeSlide";
import "./Home.css";

import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import Section5 from "./section5/Section5";

export default function Home() {
  return (
    <div className="home-page-wrapper">
      <HomeSlider />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}

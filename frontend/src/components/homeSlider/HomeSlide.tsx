import { useEffect, useState } from "react";
import { Link } from "react-router";

import "./HomeSlide.css";

import HomeSliderPagination from "./homeSliderPagintation/HomeSliderPagintation";
import { FiArrowUpRight } from "react-icons/fi";

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/HomeSliderGameCovers/reddead.png",
      title: "DISCOVER GAMES AND PLAY",
      subtitle: "YOUR NEXT ADVENTURE STARTS HERE",
      link: "/login",
      linkText: "LOGIN",
    },
    {
      image: "/images/HomeSliderGameCovers/forza6.jpg",
      title: "MORE THAN JUST PLAYING",
      subtitle: "TRACK YOUR JOURNEY. OWN EVERY ACHIEVEMENT.",
      link: "/features",
      linkText: "EXPLORE FEATURES",
    },
    {
      image: "/images/HomeSliderGameCovers/cyberpunk.png",
      title: "EVERY GAME HAS A STORY",
      subtitle: "MAKE EVERY ADVENTURE COUNT.",
      link: "/about",
      linkText: "DISCOVER OUR VISION",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <div className="carousel">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div className="carousel-slide" key={slide.image}>
              <img src={slide.image} alt={slide.title} />

              <div className="slide-content">
                <h1>{slide.title}</h1>
                <h3>{slide.subtitle}</h3>
                <Link to={slide.link} className="slider-link">
                  {slide.linkText} <FiArrowUpRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      <HomeSliderPagination
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      </div>

    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import "./HomeSlide.css";

import HomeSliderPagination from "./homeSliderPagintation/HomeSliderPagintation";
import { FiArrowUpRight } from "react-icons/fi";

const DRAG_START_DISTANCE = 5;
const SWIPE_THRESHOLD = 0.15;

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/PublicHomeGameCovers/reddead.webp",
      title: "DISCOVER GAMES AND PLAY",
      subtitle: "YOUR NEXT ADVENTURE STARTS HERE",
      link: "/login",
      linkText: "LOGIN",
    },
    {
      image: "/images/PublicHomeGameCovers/forza6.jpg",
      title: "MORE THAN JUST PLAYING",
      subtitle: "TRACK YOUR JOURNEY. OWN EVERY ACHIEVEMENT.",
      link: "/features",
      linkText: "EXPLORE FEATURES",
    },
    {
      image: "/images/PublicHomeGameCovers/cyberpunk.png",
      title: "EVERY GAME HAS A STORY",
      subtitle: "MAKE EVERY ADVENTURE COUNT.",
      link: "/about",
      linkText: "DISCOVER OUR VISION",
    },
  ];

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);

  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isDragging, currentSlide]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    hasDragged.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const delta = e.clientX - dragStartX.current;

    if (!hasDragged.current) {
      if (Math.abs(delta) < DRAG_START_DISTANCE) return;
      hasDragged.current = true;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const atFirstEdge = currentSlide === 0 && delta > 0;
    const atLastEdge = currentSlide === slides.length - 1 && delta < 0;
    setDragOffset(atFirstEdge || atLastEdge ? delta / 3 : delta);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const width = carouselRef.current?.clientWidth ?? 1;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (hasDragged.current) {
      if (delta < -width * SWIPE_THRESHOLD) {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (delta > width * SWIPE_THRESHOLD) {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <>
      <div className="carousel" ref={carouselRef}>
        <div
          className={`carousel-track${isDragging ? " dragging" : ""}`}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClickCapture={(e) => {
            if (hasDragged.current) {
              e.preventDefault();
              e.stopPropagation();
              hasDragged.current = false;
            }
          }}
        >
          {slides.map((slide) => (
            <div className="carousel-slide" key={slide.image}>
              <img src={slide.image} alt={slide.title} draggable={false} />

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

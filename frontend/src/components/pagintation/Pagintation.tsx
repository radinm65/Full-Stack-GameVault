import IHomeSliderPagination from "../../core/interfaces/props/shared/IHomeSliderPagination.props";

import "./Pagintation.css";

export default function HomeSliderPagination({
  currentSlide,
  setCurrentSlide,
  count = 3,
}: IHomeSliderPagination) {
  return (
    <>
      <div className="pagination-container">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className={`pagination ${currentSlide === index ? "pagination-active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </>
  );
}

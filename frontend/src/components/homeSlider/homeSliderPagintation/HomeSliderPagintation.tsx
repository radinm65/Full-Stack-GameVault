import IHomeSliderPagination from "../../../core/interfaces/props/IHomeSliderPagination.props";

import "./HomeSliderPagintation.css";

export default function HomeSliderPagination({
  currentSlide,
  setCurrentSlide,
}: IHomeSliderPagination) {
  return (
    <>
      <div className="pagination-container">
        <div
          className={`pagination ${currentSlide === 0 ? "pagination-active" : ""}`}
          onClick={() => setCurrentSlide(0)}
        ></div>
        <div
          className={`pagination ${currentSlide === 1 ? "pagination-active" : ""}`}
          onClick={() => setCurrentSlide(1)}
        ></div>
        <div
          className={`pagination ${currentSlide === 2 ? "pagination-active" : ""}`}
          onClick={() => setCurrentSlide(2)}
        ></div>
      </div>
    </>
  );
}

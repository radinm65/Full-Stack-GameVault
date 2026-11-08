import "./StarRating.css";

import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

import IStarRating from "../../core/interfaces/props/shared/IStarRating.props";

// Five stars, each full, half or empty, depending on the value (4.5 shows 4 full stars and a half)
export default function StarRating({ value, size = 16, className = "" }: IStarRating) {
  return (
    <span className={`star-rating ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const Icon = value >= star ? IoStar : value >= star - 0.5 ? IoStarHalf : IoStarOutline;
        return <Icon key={star} size={size} aria-hidden="true" />;
      })}
    </span>
  );
}

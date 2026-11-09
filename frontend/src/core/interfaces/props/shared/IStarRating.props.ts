interface IStarRating {
  // A rating from 0 to 5, e.g. 4.5
  value: number;
  // Size of each star in pixels
  size?: number;
  className?: string;
}

export default IStarRating;

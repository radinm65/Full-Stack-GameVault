interface IReviewForm {
  // Called with the stars (a whole number from 1 to 5) and the text of the review
  onSubmit: (stars: number, text: string) => void;
  onCancel: () => void;
}

export default IReviewForm;

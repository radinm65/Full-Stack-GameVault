// The longest review a user can write
export const MAX_REVIEW_WORDS = 500;

// How many words a text has. Any amount of spaces or new lines between words counts as one gap.
export function countWords(text: string) {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

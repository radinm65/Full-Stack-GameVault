import type { CSSProperties } from "react";

// Position in the staggered "appear" sequence that plays after the form slides
export const reveal = (i: number): CSSProperties =>
  ({ "--i": i }) as CSSProperties;

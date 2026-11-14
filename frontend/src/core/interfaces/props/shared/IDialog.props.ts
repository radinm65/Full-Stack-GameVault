import type { ReactNode } from "react";

interface IDialog {
  title: string;
  // "wide" is for forms with an image preview, it also scrolls when the screen is too short for it
  size?: "default" | "wide";
  // Called after the closing animation, the parent then stops showing the dialog
  onClose: () => void;
  // The content. It gets `close`, which closes the dialog with the animation (for Cancel and Save buttons).
  children: (close: () => void) => ReactNode;
}

export default IDialog;

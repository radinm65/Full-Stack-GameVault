import type { ReactNode } from "react";

interface IDialog {
  title: string;
  // Called after the closing animation, the parent then stops showing the dialog
  onClose: () => void;
  // The content. It gets `close`, which closes the dialog with the animation (for Cancel and Save buttons).
  children: (close: () => void) => ReactNode;
}

export default IDialog;

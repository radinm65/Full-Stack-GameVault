import "./Dialog.css";

import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";

import IDialog from "../../core/interfaces/props/shared/IDialog.props";

// How long the closing animation runs. Keep in sync with dialog-out in Dialog.css.
const CLOSE_DURATION = 250;

// A small box over the page, for short forms and lists. A native <dialog> gives the focus trap,
// Escape and the backdrop. It opens and closes with an animation, so closing waits for it before
// telling the page (onClose). The page shows it by rendering it and hides it when onClose is called.
export default function Dialog({ title, onClose, children }: IDialog) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first button (the close button), which would look selected. Focus the
      // control marked with data-autofocus (e.g. the name input) instead, or the dialog itself.
      (dialog.querySelector<HTMLElement>("[data-autofocus]") ?? dialog).focus();
    }
  }, []);

  // Once closing starts, wait for the animation and then tell the page.
  // Leaving the page cancels a close that is still running.
  useEffect(() => {
    if (!isClosing) return;

    const timer = window.setTimeout(onClose, CLOSE_DURATION);
    return () => window.clearTimeout(timer);
  }, [isClosing, onClose]);

  const close = () => setIsClosing(true);

  return (
    <dialog
      ref={dialogRef}
      className={`dialog ${isClosing ? "dialog--closing" : ""}`}
      aria-labelledby="dialog-title"
      tabIndex={-1}
      // Escape: stop the browser from closing the dialog at once, close with the animation instead
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // The backdrop is part of the dialog, so a click that lands on the dialog itself is outside the box
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <header className="dialog-header">
        <h2 id="dialog-title">{title}</h2>
        <button type="button" className="dialog-close" aria-label="Close" onClick={close}>
          <IoClose size={20} />
        </button>
      </header>

      {children(close)}
    </dialog>
  );
}

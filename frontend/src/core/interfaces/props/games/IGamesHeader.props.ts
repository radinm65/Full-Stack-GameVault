import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface IGamesHeader {
  title: string;
  // Usually text. A page can pass different texts for desktop and phone.
  subtitle: ReactNode;
  // The line with the icon below the title. Leave out both when the page has none.
  statusIcon?: IconType;
  statusText?: string;
  action?: ReactNode;
}

export default IGamesHeader;

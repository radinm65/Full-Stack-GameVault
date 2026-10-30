import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface IGamesHeader {
  title: string;
  subtitle: string;
  statusIcon: IconType;
  statusText: string;
  action?: ReactNode;
}

export default IGamesHeader;

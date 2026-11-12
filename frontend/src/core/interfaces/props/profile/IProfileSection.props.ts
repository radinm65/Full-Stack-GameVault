import type { ReactNode } from "react";

interface IProfileSection {
  title: string;
  // The small link next to the title on a phone (e.g. "Customize"). Only the owner gets one.
  actionLabel?: string;
  children: ReactNode;
}

export default IProfileSection;

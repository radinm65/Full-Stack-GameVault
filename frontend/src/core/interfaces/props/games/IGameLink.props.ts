import type { ReactNode } from "react";

interface IGameLink {
  gameId: number;
  className?: string;
  children: ReactNode;
}

export default IGameLink;

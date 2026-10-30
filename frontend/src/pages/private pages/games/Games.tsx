import "./Games.css";

import { useSearchParams } from "react-router";

import ExploreTab from "./explore/ExploreTab";
import LibraryTab from "./library/LibraryTab";

export default function Games() {
  const [searchParams] = useSearchParams();
  const isLibrary = searchParams.get("tab") === "library";

  return <div className="games-page">{isLibrary ? <LibraryTab /> : <ExploreTab />}</div>;
}

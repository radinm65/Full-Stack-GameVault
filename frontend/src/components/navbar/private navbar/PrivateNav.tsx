import { Link, useLocation } from "react-router";
import type { IconType } from "react-icons";


import { BiHomeAlt } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { VscCollection } from "react-icons/vsc";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";


import "./PrivateNav.css"

const navLinks: {
  label: string;
  path: string;
  icon: IconType;
}[] = [
  { label: "Dashboard", path: "/dashboard", icon: BiHomeAlt },
  { label: "Games", path: "/games", icon: IoGameControllerOutline },
  { label: "Community", path: "/community", icon: FaPeopleGroup },
  { label: "Collections", path: "/collections", icon: VscCollection },
  { label: "Profile", path: "/profile", icon: IoPersonCircleOutline },
];

export default function PrivateNav() {
  const currentRoute = useLocation().pathname;

  return (
    <nav className="navbar">

      <div className="navlinks">
        {navLinks.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`link ${currentRoute === path ? "active" : "not-active"}`}
          >
            <Icon size={30}  />
            <p>{label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
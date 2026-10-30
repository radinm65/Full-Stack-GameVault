import { Link, useLocation } from "react-router";
import type { IconType } from "react-icons";

import GamevaultLogo from "../../../assets/logo/GamevaultLogo";

import { BiHomeAlt } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { LuInfo } from "react-icons/lu";
import { MdOutlinePrivacyTip } from "react-icons/md";

import "./PublicNav.css";

const navLinks: {
  label: string;
  path: string;
  icon: IconType;
}[] = [
  { label: "Home", path: "/", icon: BiHomeAlt },
  { label: "Features", path: "/features", icon: FaRegStar },
  { label: "About", path: "/about", icon: LuInfo },
  { label: "Terms", path: "/terms", icon: MdOutlinePrivacyTip },
];

export default function PublicNav() {
  const currentRoute = useLocation().pathname;

  return (
    <nav className="navbar">
      <GamevaultLogo width={50} height={50} />

      <div className="navlinks">
        {navLinks.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`link ${currentRoute === path ? "active" : "not-active"}`}
          >
            <Icon size={25}  />
            <p>{label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
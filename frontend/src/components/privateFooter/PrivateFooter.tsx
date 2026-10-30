import GamevaultLogo from "../../assets/logo/GamevaultLogo";
import "./PrivateFooter.css";

import { Link, useLocation } from "react-router";

export default function PrivateFooter() {
  const location = useLocation().pathname;
  const footerPages = [
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      name: "Games",
      route: "/games",
    },
    {
      name: "Community",
      route: "/community",
    },
    {
      name: "Collections",
      route: "/collections",
    },
    {
      name: "Profile",
      route: "/profile",
    },
  ];

  const availableFooterPages = footerPages.filter((x) => location !== x.route);

  return (
    <>
      <div className="public-footer">
        <div className="public-footer-link-header">
          <GamevaultLogo height={40} width={40} />
          <div className="public-footer-link-div">
            {availableFooterPages.map((page, index) => (
              <Link to={page.route} key={index} className="public-footer-link">
                {page.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="public-footer-footer">
          <p>Game discovery. Achievement tracking. Community.</p>
          <p>Game names and artwork belong to their respective owners.</p>
        </div>
      </div>
    </>
  );
}

import "./PrivateLayout.css";

import { Outlet, useLocation } from "react-router";

import PrivateNav from "../../components/navbar/private navbar/PrivateNav";
import Header from "../../components/header/Header";
import PrivateFooter from "../../components/privateFooter/PrivateFooter";

export default function PrivateLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="private-bg-layout">
        <PrivateNav />
        <Header />
        <div className="content">
          {/* The key changes with the page (not with the filters in the query string), so every
              private page fades in when the user navigates to it */}
          <div key={pathname} className="page-transition">
            <Outlet />
          </div>
          <PrivateFooter/>
        </div>
      </div>
    </>
  );
}

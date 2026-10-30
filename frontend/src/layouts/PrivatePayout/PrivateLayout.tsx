import "./PrivateLayout.css";

import { Outlet } from "react-router";

import PrivateNav from "../../components/navbar/private navbar/PrivateNav";
import Header from "../../components/header/Header";
import PrivateFooter from "../../components/privateFooter/PrivateFooter";

export default function PrivateLayout() {
  return (
    <>
      <div className="private-bg-layout">
        <PrivateNav />
        <Header />
        <div className="content">
          <Outlet />
          <PrivateFooter/>
        </div>
      </div>
    </>
  );
}

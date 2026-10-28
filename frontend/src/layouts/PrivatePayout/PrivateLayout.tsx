import "./PrivateLayout.css";

import { Outlet } from "react-router";

import PublicNav from "../../components/public navbar/PublicNav";
import Header from "../../components/header/Header";
import PublicFooter from "../../components/publicFooter/PublicFooter";

export default function PrivateLayout() {
  return (
    <>
      <div className="bg-layout">
        <PublicNav />
        <div className="content">
          <Header />
          <Outlet />
          <PublicFooter />
        </div>
      </div>
    </>
  );
}

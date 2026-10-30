import "./PublicLayout.css"

import { Outlet } from "react-router";

import PublicNav from "../../components/navbar/public navbar/PublicNav";
import PublicFooter from "../../components/publicFooter/PublicFooter";

export default function PublicLayout() {
  return (
    <>
      <div className="public-bg-layout">
        <PublicNav />
        <div className="public-content">
          <Outlet />
          <PublicFooter />
        </div>
      </div>
    </>
  );
}

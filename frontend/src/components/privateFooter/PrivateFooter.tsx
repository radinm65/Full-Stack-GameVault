import GamevaultLogo from "../../assets/logo/GamevaultLogo";
import './PrivateFooter.css'

import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router";



export default function PrivateFooter() {
  return (
    <>
      <div className="public-footer">
        <div className="public-footer-link-header">
          <GamevaultLogo height={40} width={40} />
          <div className="public-footer-link-div">
            <Link to={"/"} className="public-footer-link">
              Home
            </Link>
            <Link to={"/features"} className="public-footer-link">
              Features
            </Link>
            <Link to={"/about"} className="public-footer-link">
              About
            </Link>
            <Link to={"/terms"} className="public-footer-link">
              Terms
            </Link>
            <Link to={"/login"} className="public-footer-login-link">
              <h5>LOGIN</h5>
              <FiArrowUpRight />
            </Link>
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

import "./PublicCta.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

interface PublicCtaProps {
  title: string;
  text: string;
}

export default function PublicCta({ title, text }: PublicCtaProps) {
  return (
    <div className="public-cta">
      <p className="public-cta-label">THE NEXT CHAPTER IS YOURS</p>
      <h1>{title}</h1>
      <p className="public-cta-text">{text}</p>
      <div className="public-cta-actions">
        <Link to="/register" className="public-cta-button">
          GET STARTED <FiArrowUpRight />
        </Link>
        <Link to="/login" className="public-cta-login">
          Already a member? Log in
        </Link>
      </div>
    </div>
  );
}

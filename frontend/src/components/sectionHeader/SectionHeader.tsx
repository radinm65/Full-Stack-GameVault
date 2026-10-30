import "./SectionHeader.css";

import { Link } from "react-router";

import { FiArrowUpRight } from "react-icons/fi";

import ISectionHeader from "../../core/interfaces/props/shared/ISectionHeader.props";

export default function SectionHeader({
  title,
  linkText,
  linkTo,
}: ISectionHeader) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <Link to={linkTo} className="section-header-link">
        {linkText} <FiArrowUpRight />
      </Link>
    </div>
  );
}

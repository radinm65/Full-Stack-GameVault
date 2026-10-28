import "./Section1.css";

import { LuFileWarning } from "react-icons/lu";

export default function Section1() {
  return (
    <div className="terms-section1">
      <p className="terms-label">PLATFORM / LEGAL</p>
      <h1>TERMS OF USE</h1>
      <p className="terms-section1-text">
        Clear expectations for discovery, achievement tracking and a respectful
        gaming community.
      </p>

      <div className="terms-section1-notice">
        <span className="terms-section1-notice-icon">
          <LuFileWarning size={22} />
        </span>
        <div>
          <p className="terms-section1-notice-title">
            DRAFT — NOT IN EFFECT
          </p>
          <p>
            Prepared for review only. This is not legal advice or a published
            agreement. Operator details, privacy practices and contact
            information must be confirmed before use.
          </p>
        </div>
      </div>

      <p className="terms-section1-status">
        Publication status: review required / Effective date: not assigned
      </p>
    </div>
  );
}

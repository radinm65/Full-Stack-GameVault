import ISignupStep from "../../../core/interfaces/props/auth/ISignupStep.props";
import { reveal } from "../../../layouts/AuthLayout/reveal";

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

export default function PersonalInfoStep({ values, onChange }: ISignupStep) {
  return (
    <div className="signup-grid">
    
      <div className="auth-field auth-reveal" style={reveal(4)}>
        <label className="auth-label" htmlFor="signup-first-name">
          First name <span className="auth-optional">(optional)</span>
        </label>
        <input
          id="signup-first-name"
          className="auth-input"
          type="text"
          name="firstName"
          placeholder="John"
          autoComplete="given-name"
          value={values.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(5)}>
        <label className="auth-label" htmlFor="signup-last-name">
          Last name <span className="auth-optional">(optional)</span>
        </label>
        <input
          id="signup-last-name"
          className="auth-input"
          type="text"
          name="lastName"
          placeholder="Doe"
          autoComplete="family-name"
          value={values.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(6)}>
        <label className="auth-label" htmlFor="signup-dob">
          Date of birth <span className="auth-optional">(optional)</span>
        </label>
        <input
          id="signup-dob"
          className="auth-input signup-date"
          type="date"
          name="dateOfBirth"
          autoComplete="bday"
          value={values.dateOfBirth}
          onChange={(e) => onChange("dateOfBirth", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(7)}>
        <label className="auth-label" htmlFor="signup-phone">
          Phone number <span className="auth-optional">(optional)</span>
        </label>
        <input
          id="signup-phone"
          className="auth-input"
          type="tel"
          name="phone"
          placeholder="+1 234 567 890"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>

      <div className="auth-field signup-wide auth-reveal" style={reveal(8)}>
        <label className="auth-label" htmlFor="signup-gender">
          Gender <span className="auth-optional">(optional)</span>
        </label>
        <select
          id="signup-gender"
          className="auth-input"
          name="gender"
          value={values.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="">Select gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

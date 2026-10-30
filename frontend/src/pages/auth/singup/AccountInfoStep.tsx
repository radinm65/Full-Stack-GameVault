import ISignupStep from "../../../core/interfaces/props/ISignupStep.prop";
import { reveal } from "../../../layouts/AuthLayout/reveal";

export default function AccountInfoStep({ values, onChange }: ISignupStep) {
  return (
    <div className="signup-grid">
      <div className="auth-field auth-reveal" style={reveal(3)}>
        <label className="auth-label" htmlFor="signup-username">
          Username
        </label>
        <input
          id="signup-username"
          className="auth-input"
          type="text"
          name="username"
          placeholder="user@123"
          autoComplete="username"
          value={values.username}
          onChange={(e) => onChange("username", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(4)}>
        <label className="auth-label" htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          className="auth-input"
          type="email"
          name="email"
          placeholder="gamevault@gmail.com"
          autoComplete="email"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(5)}>
        <label className="auth-label" htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password@123"
          autoComplete="new-password"
          value={values.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>

      <div className="auth-field auth-reveal" style={reveal(6)}>
        <label className="auth-label" htmlFor="signup-confirm-password">
          Confirm Password
        </label>
        <input
          id="signup-confirm-password"
          className="auth-input"
          type="password"
          name="confirmPassword"
          placeholder="Password@123"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
      </div>
    </div>
  );
}

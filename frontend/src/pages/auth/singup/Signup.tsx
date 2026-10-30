import "./Signup.css";

import { useEffect, useState } from "react";
import type { CSSProperties, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";

import ISignupValues from "../../../core/interfaces/forms/ISignupValues";
import { reveal } from "../../../layouts/AuthLayout/reveal";
import AccountInfoStep from "./AccountInfoStep";
import PersonalInfoStep from "./PersonalInfoStep";
import GamingIdentityStep from "./GamingIdentityStep";

const steps = [
  { label: "Account Info", subtitle: "Signup to start playing and exploring worlds!" },
  { label: "Personal Info", subtitle: "Tell us a little about yourself" },
  { label: "Gaming Identity", subtitle: "Pick how you show up in the vault" },
];

const initialValues: ISignupValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  gender: "",
  avatarUrl: "",
  bio: "",
};

export default function SignUp() {
  const [step, setStep] = useState(0);
  // Once the user moves between steps there is no slide to wait for, so text appears right away
  const [moved, setMoved] = useState(false);
  const [values, setValues] = useState(initialValues);

  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  const navigate = useNavigate()

  // Free the avatar preview URL when it is replaced, and when the page unmounts
  useEffect(() => {
    const url = values.avatarUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [values.avatarUrl]);

  const handleChange = (field: keyof ISignupValues, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const goTo = (next: number) => {
    setMoved(true);
    setStep(next);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLast) {
      goTo(step + 1);
      return
    } 

    navigate("/dashboard")

  };

  const stepProps = { values, onChange: handleChange };
  const panelStyle = moved
    ? ({ "--reveal-delay": "0s" } as CSSProperties)
    : undefined;
  // Keeps the buttons last in the reveal order (step 2 has more fields)
  const actionsIndex = step === 1 ? 9 : 7;

  return (
    <div className="signup">
      <div className="auth-header auth-reveal" style={reveal(1)}>
        <h1 className="auth-title">Welcome!</h1>
        <p className="auth-subtitle">{steps[step].subtitle}</p>
      </div>

      <ol className="signup-steps auth-reveal" style={reveal(2)}>
        {steps.map(({ label }, i) => (
          <li
            key={label}
            className={`signup-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
          >
            <span className="signup-step-circle">{i + 1}</span>
            <span className="signup-step-label">{label}</span>
          </li>
        ))}
      </ol>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div key={step} className="signup-panel" style={panelStyle}>
          {step === 0 && <AccountInfoStep {...stepProps} />}
          {step === 1 && <PersonalInfoStep {...stepProps} />}
          {step === 2 && <GamingIdentityStep {...stepProps} />}

          <div
            className="signup-actions auth-reveal"
            style={reveal(actionsIndex)}
          >
            {!isFirst && (
              <button
                type="button"
                className="auth-btn auth-btn--outline signup-back"
                onClick={() => goTo(step - 1)}
              >
                Back
              </button>
            )}
            <button type="submit" className="auth-btn">
              {isLast ? "Create account" : "Proceed"}
            </button>
          </div>
        </div>
      </form>

      <p className="auth-switch auth-reveal" style={reveal(10)}>
        Do you have an account?{" "}
        <Link to="/login" className="auth-link">
          Signin
        </Link>
      </p>
    </div>
  );
}

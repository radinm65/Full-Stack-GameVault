import "./Login.css";

import { Link } from "react-router";

import { reveal } from "../../../layouts/AuthLayout/reveal";

export default function Login() {
  return (
    <div className="login">
      <div className="auth-header auth-reveal" style={reveal(1)}>
        <h1 className="auth-title">Welcome Back!</h1>
        <p className="auth-subtitle">Signin to your account to continue playing</p>
      </div>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field auth-reveal" style={reveal(2)}>
          <label className="auth-label" htmlFor="login-username">
            Username
          </label>
          <input
            id="login-username"
            className="auth-input"
            type="text"
            name="username"
            placeholder="user@123"
            autoComplete="username"
          />
        </div>

        <div className="auth-field auth-reveal" style={reveal(3)}>
          <label className="auth-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password@123"
            autoComplete="current-password"
          />
        </div>

        <div className="login-options auth-reveal" style={reveal(4)}>
          <label className="login-remember">
            <input type="checkbox" name="remember" />
            Remember Me
          </label>
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="auth-btn auth-reveal" style={reveal(5)}>
          Login
        </button>

        <p className="login-or auth-reveal" style={reveal(6)}>
          Or
        </p>

        <button
          type="button"
          className="auth-btn auth-btn--outline auth-reveal"
          style={reveal(7)}
        >
          Continue with Google
        </button>
      </form>

      <p className="auth-switch auth-reveal" style={reveal(8)}>
        New to Game Vault?{" "}
        <Link to="/signup" className="auth-link">
          Create account
        </Link>
      </p>
    </div>
  );
}

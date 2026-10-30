import "./AuthLayout.css";

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

import GamevaultLogo from "../../assets/logo/GamevaultLogo";

// Keep in sync with --auth-slide-time in AuthLayout.css
const SLIDE_MS = 700;

export default function AuthLayout() {
  const variant = useLocation().pathname === "/signup" ? "signup" : "login";

  // Counts login <-> signup switches: remounts the brand so it re-appears after
  // the slide, and delays the text reveal until the form has finished moving
  const [prevVariant, setPrevVariant] = useState(variant);
  const [swaps, setSwaps] = useState(0);
  const [sliding, setSliding] = useState(false);
  if (variant !== prevVariant) {
    setPrevVariant(variant);
    setSwaps(swaps + 1);
    setSliding(true);
  }

  // Slide transitions only run during a switch, so resizing the window never lags
  useEffect(() => {
    if (!sliding) return;
    const timer = setTimeout(() => setSliding(false), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [sliding, swaps]);

  return (
    <div
      className={`auth-layout auth-layout--${variant} ${swaps > 0 ? "auth-layout--swapped" : ""} ${sliding ? "auth-layout--sliding" : ""}`}
    >
      <div className="auth-bg" />
      <div className="auth-poster-edge" />
      <div className="auth-poster" />

      <main className="auth-form-side">
        <Link key={swaps} to="/" className="auth-brand">
          <span>GAMEVAULT</span>
          <GamevaultLogo width={44} height={44} />
        </Link>

        <Outlet />
      </main>
    </div>
  );
}

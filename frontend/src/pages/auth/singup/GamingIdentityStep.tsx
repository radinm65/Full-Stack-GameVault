import { useRef } from "react";
import { LuPencil, LuUser } from "react-icons/lu";

import ISignupStep from "../../../core/interfaces/props/ISignupStep.prop";
import { reveal } from "../../../layouts/AuthLayout/reveal";

const BIO_MAX_LENGTH = 160;

export default function GamingIdentityStep({ values, onChange }: ISignupStep) {
  const fileInput = useRef<HTMLInputElement>(null);

  const name = values.displayName.trim() || values.username.trim();

  const handleAvatar = (file: File | undefined) => {
    if (file) onChange("avatarUrl", URL.createObjectURL(file));
  };

  return (
    <div className="identity">
      <div className="identity-columns">
        <div className="auth-field auth-reveal" style={reveal(6)}>
          <span className="auth-label">Final profile preview</span>
          <div className="profile-card">
            <div className="avatar-container">
              <div className="profile-card-avatar">
                {values.avatarUrl ? (
                  <img src={values.avatarUrl} alt="" />
                ) : (
                  <LuUser size={26} />
                )}
                <button
                  type="button"
                  className="avatar-edit"
                  aria-label="Edit avatar"
                  onClick={() => fileInput.current?.click()}
                >
                  <LuPencil size={15} />
                </button>

                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleAvatar(e.target.files?.[0])}
                />
              </div>
            </div>

            <div className="profile-card-info">
              <strong>{name || "Display name"}</strong>
              <span className="profile-card-username">
                @{values.username.trim() || "username"}
              </span>
            </div>
          </div>
        </div>

        <div
          className="auth-field auth-reveal auth-displayed-name"
          style={reveal(3)}
        >
          <label className="auth-label" htmlFor="signup-display-name">
            Display name
          </label>
          <input
            id="signup-display-name"
            className="auth-input"
            type="text"
            name="displayName"
            placeholder="How other players will see you"
            autoComplete="nickname"
            value={values.displayName}
            onChange={(e) => onChange("displayName", e.target.value)}
          />
        </div>
      </div>

      <div className="auth-field auth-reveal" style={reveal(5)}>
        <label className="auth-label" htmlFor="signup-bio">
          Short bio <span className="auth-optional">(optional)</span>
        </label>
        <textarea
          id="signup-bio"
          className="auth-input signup-bio"
          name="bio"
          rows={3}
          maxLength={BIO_MAX_LENGTH}
          placeholder="Tell other players what you love to play"
          value={values.bio}
          onChange={(e) => onChange("bio", e.target.value)}
        />
        <span className="signup-bio-count">
          {values.bio.length}/{BIO_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}

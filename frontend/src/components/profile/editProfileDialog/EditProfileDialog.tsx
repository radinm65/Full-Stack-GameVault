import "./EditProfileDialog.css";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { IoCameraOutline } from "react-icons/io5";

import CommunityAvatar from "../../community/communityAvatar/CommunityAvatar";
import Dialog from "../../dialog/Dialog";
import IEditProfileDialog from "../../../core/interfaces/props/profile/IEditProfileDialog.props";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 30;
const MAX_BIO_LENGTH = 160;
// ! DUMMY RULE: the real limit comes from the image upload (the server checks it again)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// The message under the display name, or "" when it is fine
function getNameError(name: string): string {
  const length = name.trim().length;

  if (length === 0) return "Display name is required.";
  if (length < MIN_NAME_LENGTH) return `Display name needs at least ${MIN_NAME_LENGTH} characters.`;
  return "";
}

// "Edit Profile" on your own profile. The fields of the docs: display name, bio, avatar and cover.
// The username is not here, it cannot be changed.
export default function EditProfileDialog({ profile, onSave, onClose }: IEditProfileDialog) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [banner, setBanner] = useState(profile.banner);

  // Errors wait for the first Save click, so the form does not shout while the user is still typing
  const [showErrors, setShowErrors] = useState(false);
  const [imageError, setImageError] = useState("");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const nameError = showErrors ? getNameError(name) : "";

  // Reads the chosen file into the preview. It is only kept on the page, nothing is uploaded yet.
  // ! Upload the image on Save (POST /api/users/me/avatar, /cover) and keep the URL the server returns.
  const chooseImage = (event: ChangeEvent<HTMLInputElement>, onLoad: (url: string) => void) => {
    const file = event.target.files?.[0];
    // The same file can be chosen again after a change
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("The image is too big. Choose one under 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageError("");
      onLoad(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog title="Edit Profile" size="wide" onClose={onClose}>
      {(close) => {
        const save = (event: FormEvent) => {
          event.preventDefault();

          if (getNameError(name) !== "") {
            setShowErrors(true);
            return;
          }

          onSave({ name: name.trim(), bio: bio.trim(), avatar, banner });
          close();
        };

        return (
          <form className="edit-profile" onSubmit={save} noValidate>
            <div className="edit-profile-field">
              <span className="edit-profile-label">Cover</span>
              <div className="edit-profile-cover">
                <img src={banner} alt="Current cover" draggable={false} />
                <button
                  type="button"
                  className="edit-profile-pick"
                  onClick={() => bannerInputRef.current?.click()}
                >
                  <IoCameraOutline size={18} aria-hidden="true" /> Change cover
                </button>
              </div>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => chooseImage(e, setBanner)}
              />
            </div>

            <div className="edit-profile-field">
              <span className="edit-profile-label">Avatar</span>
              <div className="edit-profile-avatar-row">
                {avatar ? (
                  <img className="edit-profile-avatar" src={avatar} alt="Current avatar" draggable={false} />
                ) : (
                  <CommunityAvatar initial={name.trim().charAt(0) || profile.initial} size={72} />
                )}

                <button
                  type="button"
                  className="edit-profile-pick"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <IoCameraOutline size={18} aria-hidden="true" /> Change photo
                </button>
                {avatar && (
                  <button
                    type="button"
                    className="edit-profile-remove"
                    onClick={() => setAvatar(undefined)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => chooseImage(e, setAvatar)}
              />
            </div>

            {imageError && (
              <p className="edit-profile-error" role="alert">
                {imageError}
              </p>
            )}

            <div className="edit-profile-field">
              <label className="edit-profile-label" htmlFor="profile-name">
                Display name
              </label>
              <input
                id="profile-name"
                className="edit-profile-input"
                type="text"
                value={name}
                maxLength={MAX_NAME_LENGTH}
                autoComplete="off"
                aria-invalid={nameError !== ""}
                aria-describedby={nameError ? "profile-name-error" : undefined}
                data-autofocus
                onChange={(e) => setName(e.target.value)}
              />
              <div className="edit-profile-hint">
                <p id="profile-name-error" className="edit-profile-error" role="alert">
                  {nameError}
                </p>
                <p>
                  {name.length} / {MAX_NAME_LENGTH}
                </p>
              </div>
            </div>

            <div className="edit-profile-field">
              <label className="edit-profile-label" htmlFor="profile-bio">
                Bio
              </label>
              <textarea
                id="profile-bio"
                className="edit-profile-input edit-profile-bio"
                value={bio}
                maxLength={MAX_BIO_LENGTH}
                rows={3}
                placeholder="Tell other players about yourself"
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="edit-profile-hint">
                <span />
                <p>
                  {bio.length} / {MAX_BIO_LENGTH}
                </p>
              </div>
            </div>

            <div className="dialog-actions">
              <button type="button" className="dialog-button" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="dialog-button dialog-button--main">
                Save
              </button>
            </div>
          </form>
        );
      }}
    </Dialog>
  );
}

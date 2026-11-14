import type { IProfile, IProfileEdits } from "../../models/profile/IProfile";

interface IEditProfileDialog {
  profile: IProfile;
  // Called with the new values when the form is valid. The page then updates the profile it shows.
  onSave: (edits: IProfileEdits) => void;
  onClose: () => void;
}

export default IEditProfileDialog;

import type { IProfile } from "../../models/profile/IProfile";

interface IProfileHero {
  profile: IProfile;
  // Opens the Edit Profile form (the button only shows on your own profile)
  onEdit: () => void;
}

export default IProfileHero;

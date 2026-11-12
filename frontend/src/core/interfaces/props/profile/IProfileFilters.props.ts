import type ProfileView from "../../models/profile/ProfileView";

interface IProfileFilters {
  active: ProfileView;
  onChange: (view: ProfileView) => void;
}

export default IProfileFilters;

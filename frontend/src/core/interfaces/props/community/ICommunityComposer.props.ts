import type { IShareChoice } from "../../models/community/IShareable";

interface ICommunityComposer {
  firstName: string;
  initial: string;
  // Called when the user shares what they picked. `caption` is what they typed in the box, it can be empty.
  onShare: (choice: IShareChoice, caption: string) => void;
}

export default ICommunityComposer;

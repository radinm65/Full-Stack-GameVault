import type { IShareChoice } from "../../models/community/IShareable";

interface ICommunityShare {
  onShare: (choice: IShareChoice) => void;
  onCancel: () => void;
}

export default ICommunityShare;

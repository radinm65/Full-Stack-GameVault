interface ICollectionNameDialog {
  // The name the user typed (already trimmed, never empty)
  onCreate: (name: string) => void;
  onClose: () => void;
}

export default ICollectionNameDialog;

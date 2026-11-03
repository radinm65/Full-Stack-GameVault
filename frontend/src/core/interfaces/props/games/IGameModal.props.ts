interface IGameModal {
  // The id from the URL (?game=2), so it is text
  gameId: string;
  onClose: () => void;
}

export default IGameModal;

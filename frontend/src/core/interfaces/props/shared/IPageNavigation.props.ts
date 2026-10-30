interface IPageNavigation {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default IPageNavigation;

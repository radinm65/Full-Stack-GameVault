interface IFilterOption {
  value: string;
  label: string;
}

interface IFilterSelect {
  label: string;
  value: string;
  options: IFilterOption[];
  onChange: (value: string) => void;
}

export type { IFilterOption };
export default IFilterSelect;

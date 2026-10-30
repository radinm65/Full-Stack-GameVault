import type { IFilterOption } from "./IFilterSelect.props";

interface IFilterChipOption extends IFilterOption {
  count?: number;
}

interface IFilterChips {
  label: string;
  value: string;
  options: IFilterChipOption[];
  onChange: (value: string) => void;
}

export type { IFilterChipOption };
export default IFilterChips;

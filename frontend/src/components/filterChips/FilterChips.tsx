import "./FilterChips.css";

import IFilterChips from "../../core/interfaces/props/shared/IFilterChips.props";

export default function FilterChips({ label, value, options, onChange }: IFilterChips) {
  return (
    <div className="filter-chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`filter-chip ${value === option.value ? "filter-chip-active" : ""}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.count !== undefined && ` ${option.count}`}
        </button>
      ))}
    </div>
  );
}

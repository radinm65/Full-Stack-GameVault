import "./FilterSelect.css";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

import { IoChevronDown } from "react-icons/io5";

import IFilterSelect from "../../core/interfaces/props/shared/IFilterSelect.props";

// Keep in sync with max-width of .filter-select-menu
const MENU_MAX_WIDTH = 240;

// Pill with a "Label: value" look and a hand made menu. The real <select> stays in the DOM
// underneath the designed control, so the value is still a native one (forms, autofill) while
// the pill and the menu follow the app's design. The designed control carries the keyboard and
// screen reader behavior (select-only combobox).
export default function FilterSelect({ label, value, options, onChange }: IFilterSelect) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  // The option the keyboard or the mouse is currently on (highlighted, not yet chosen)
  const [activeIndex, setActiveIndex] = useState(0);
  const [opensToLeft, setOpensToLeft] = useState(false);

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  const openMenu = () => {
    // Open towards the left when the menu would run off the right edge of the screen
    const rect = rootRef.current?.getBoundingClientRect();
    setOpensToLeft(rect !== undefined && rect.left + MENU_MAX_WIDTH > window.innerWidth - 16);
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const selectOption = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  // Safari does not focus a button on click, so blur alone cannot be trusted to close the menu
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Pressing Enter or Space on a button also fires a click, but with detail 0 (a real mouse
    // click has detail 1 or more). Those keys are already handled in handleKeyDown, so skip them
    // here, otherwise the menu would open and close in the same key press.
    if (e.detail === 0) return;

    if (open) setOpen(false);
    else openMenu();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (open) setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        else openMenu();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActiveIndex((i) => Math.max(i - 1, 0));
        else openMenu();
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) selectOption(activeIndex);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="filter-select" ref={rootRef}>
      <select
        className="filter-select-native"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        role="combobox"
        className="filter-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlur={() => setOpen(false)}
      >
        <span id={`${id}-label`}>{label}:</span>
        <span id={`${id}-value`}>{options[selectedIndex]?.label}</span>
        <IoChevronDown size={11} aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          className={`filter-select-menu ${opensToLeft ? "filter-select-menu--end" : ""}`}
          // Keeps the focus on the button, otherwise it would blur and close before the click lands
          onMouseDown={(e) => e.preventDefault()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`filter-select-option ${index === activeIndex ? "filter-select-option--active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

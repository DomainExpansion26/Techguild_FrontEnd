import { useState, useEffect } from "react";

/**
 * Debounce a rapidly changing value.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Toggle a boolean state value.
 */
export function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle, setState];
}

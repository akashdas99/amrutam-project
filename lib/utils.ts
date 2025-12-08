import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object).
 * For arrays, filters out empty elements and checks if any valid values remain.
 * For arrays of objects, checks if each object has all keys with non-empty values.
 */
export function isEmpty(value?: unknown): boolean {
  // null or undefined
  if (value == null) return true;

  // String - check if empty or whitespace only
  if (typeof value === "string") return value.trim().length === 0;

  // Array - filter out empty values and check if any remain
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => !isEmpty(item));
    return filtered.length === 0;
  }

  // Object - check if has any keys AND all values are non-empty
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return true;

    // Check if all values in the object are non-empty
    return keys.every((key) => isEmpty((value as Record<string, unknown>)[key]));
  }

  // Numbers, booleans, functions, etc. are considered non-empty
  return false;
}

/**
 * Filters an array to remove all empty values.
 * Returns a new array with only non-empty elements.
 */
export function filterEmpty<T>(value: T[]): T[] {
  return value.filter((item) => !isEmpty(item));
}

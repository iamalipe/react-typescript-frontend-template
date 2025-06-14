import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function qString(data: unknown) {
  const result = qs.stringify(data, {
    filter: (_prefix, value) => (value !== "" ? value : undefined),
    arrayFormat: "indices",
    allowEmptyArrays: false,
    encodeValuesOnly: true,
    skipNulls: true,
    strictNullHandling: true,
  });
  return result;
}

export function sanitizeObject(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj
      .map(sanitizeObject) // Recursively clean array elements
      .filter((item) => item !== undefined && item !== null && item !== ""); // Remove unwanted values from array
  }
  if (typeof obj === "object" && obj !== null) {
    const cleanedObject: { [key: string]: unknown } = {};

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = sanitizeObject(value); // Recursively clean nested values
      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        cleanedValue !== ""
      ) {
        cleanedObject[key] = cleanedValue;
      }
    }

    return cleanedObject;
  }

  return obj; // Return the value as-is if it's not an array or object
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
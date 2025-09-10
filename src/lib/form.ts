import { FieldErrors, FieldValues } from "react-hook-form";

export function getErrorByPath<T extends FieldValues>(
  errors: FieldErrors<T>,
  path: string
) {
  return path
    .split(".")
    .reduce<any>(
      (acc, key) => (acc && acc[key] ? acc[key] : undefined),
      errors
    );
}
